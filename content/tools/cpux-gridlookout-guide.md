---
title: CPUX Framework Developer Guide
order: 20
description: Maintaining Integrity Between GridLookout and CPUX Engine
---

# CPUX Framework Developer Guide
## Maintaining Integrity Between GridLookout and CPUX Engine

## 1. Architecture Overview

### The Separation of Concerns

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                                       │
│  ┌─────────────────────┐        ┌─────────────────────┐                    │
│  │   GridLookout       │◄──────►│   CPUX Engine       │                    │
│  │   (Presentation)    │ WebSocket│  (Computation)     │                    │
│  │                     │        │                     │                    │
│  │  • Renders cells    │        │  • Runs ICs         │                    │
│  │  • Handles clicks   │        │  • Manages Field    │                    │
│  │  • Displays state   │        │  • Executes DNs     │                    │
│  └─────────────────────┘        └─────────────────────┘                    │
│           ▼                              ▲                                  │
│           │      First Contact (IPTP)     │                                  │
│           └──────────────────────────────┘                                  │
│                         │                                                   │
│                         ▼                                                   │
│              ┌─────────────────────┐                                        │
│              │   Backend Server    │                                        │
│              │  (Mock/Production)  │                                        │
│              │                     │                                        │
│              │  • Serves manifest  │                                        │
│              │  • Initiates IPTP   │                                        │
│              └─────────────────────┘                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Key Principle:** GridLookout knows nothing about CPUX internals (ICs, DNs, FieldBoard). CPUX knows nothing about GridLookout internals (cells, rendering, DOM). They communicate via the IS Bridge Wire Protocol.

## 2. First Contact Protocol (IPTP)

### What is First Contact?

First Contact is the bootstrap signal that transforms a "bare" GridLookout into a running Perceptive Application. It's the only moment when the backend pushes data to the client without a prior request from CPUX.

### Protocol Flow

```
Syep 0: Gridlookout send a request for a CPUX. 
Step 1: Backend sends First Contact IPTP Signal
═══════════════════════════════════════════════════════════════════════════════
WebSocket: ws://localhost:4000 (Backend)
Message Type: "first-contact" | "iptp:signal"

{
  "type": "first-contact",
  "intentionId": "I_first_contact",
  "pulses": {
    "app_manifest": {
      "tv": "Y",
      "responses": ["{...entire shopping-cart-app.json...CPUX.}"]
    },
    "cpux_url": {
      "tv": "Y", 
      "responses": ["ws://localhost:3000"]
    },
    "backend_url": {
      "tv": "Y",
      "responses": ["ws://localhost:4000"]
    },
    "session_id": {
      "tv": "Y",
      "responses": ["sess_123456"]
    }
  }
}

Step 2: GridLookout processes First Contact
═══════════════════════════════════════════════════════════════════════════════
• Parses app_manifest JSON
• Extracts "scene" → sends to GridLookoutRenderer
• Extracts "cpux" → stores for later
• Connects to CPUX Engine at cpux_url

Step 3: CPUX Engine initialization
═══════════════════════════════════════════════════════════════════════════════
WebSocket: ws://localhost:3000 (CPUX Engine)

Client sends:  gl:init-cpux
{
  "type": "gl:init-cpux",
  "cpux": { ... cpux config from manifest ... }
}

CPUX responds: cpux:ready | cpux:error
{
  "type": "cpux:ready",
  "cpuxId": "cpux",
  "icCount": 4
}

Step 4: Cell registration
═══════════════════════════════════════════════════════════════════════════════
Client sends:  gl:register-cells
{
  "type": "gl:register-cells",
  "cells": [
    {
      "cellId": "cell_add_P001",
      "pulsePhrase": "add_P001",
      "receptorICId": "IC_cart",
      "actionIntentionId": "I_cart_action",
      "subscribe": []
    },
    ...
  ]
}

CPUX responds: cpux:started
{
  "type": "cpux:started",
  "cpuxId": "cpux"
}

Step 5: Application is live
═══════════════════════════════════════════════════════════════════════════════
• GridLookout renders cells
• User clicks trigger gl:cell-action messages
• CPUX processes through ICs/DNs
• CPUX sends cpux:cell-update to refresh display
```

## 3. How CPUX Engine Works

### Core Concepts

| Concept | Description | Analogy |
|---------|-------------|---------|
| Signal | A set of Pulses with an Intention ID | A form with multiple fields |
| Pulse | A named perception with Trivalence (Y/N/UN) + responses | A single form field |
| Intention Container (IC) | A processing unit with Holder, DN, Reflector | A worker with inbox, processor, outbox |
| Design Node (DN) | The computation logic (pure function) | The worker's brain |
| Holder (O_holder) | Accumulates input Pulses | The inbox |
| Reflector (O_reflector) | Releases output Pulses | The outbox |
| FieldBoard | The runtime environment managing all ICs | The factory floor |

### IC Lifecycle

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   IDLE      │────▶│  QUEUED     │────▶│  RUNNING    │────▶│ COMPLETED   │
│             │     │             │     │             │     │             │
│ Awaiting    │     │ Signal      │     │ DN.execute()│     │ Reflector   │
│ input       │     │ received    │     │ processing  │     │ released    │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
       │                                                      │
       │                                                      │
       └──────────────────────────────────────────────────────┘
                         (can re-queue if not runOnce)
```

### Perception Modes (Critical!)

All actions carry a perception mode that determines how O_holder handles input:

| Mode | Behavior | Use Case |
|------|----------|----------|
| ACT | Append to accumulated state | Normal user actions |
| RESUME | Replay from persistence | Re-entering a context |
| RESET | Clear all accumulated state | Starting fresh |
| COMMIT | Freeze state (no more appends) | Final confirmation |

**Important:** The same cell click can behave differently based on mode. The mode is attached to the action, not the cell.

## 4. GridLookout Engine Responsibilities

### Cell Binding Structure

```javascript
// From shopping-cart-app.json cell definition
{
  "cellId": "cell_add_P001",           // Unique ID
  "pulsePhrase": "add_P001",           // Maps to Pulse name
  "tv": "UN",                          // Initial Trivalence
  "response": [...],                   // Initial display data
  
  "visual": {                          // GridLookout-specific
    "position": {"startCell": [3,1], "span": [2,7]},
    "inputMethod": "action"            // "action" | "display" | "text"
  },
  
  "binding": {                         // CPUX connection
    "receptorICId": "IC_cart",         // Which IC receives this
    "actionIntentionId": "I_cart_action", // Signal intention
    "subscribe": [                     // Updates to receive
      {"icId": "IC_cart", "intentionId": "I_cart_display"}
    ]
  }
}
```

### Three-Level Subscription Filtering

When CPUX sends `cpux:cell-update`, GridLookout matches using:

1. **Level 1:** icId matches subscription
2. **Level 2:** intentionId matches subscription
3. **Level 3:** pulsePhrase matches cell's pulsePhrase

All three must match for the update to apply to a cell.

## 5. Critical Integration Points

### A. Manifest Processing (Fragile Area)

The `extractScene()` function in `gridlookout-engine.js` handles three JSON shapes:

```javascript
function extractScene(obj) {
  if (obj.cells) return obj;                    // Direct scene
  if (obj.scene && obj.scene.cells) return obj.scene;  // Wrapped (app manifest)
  return obj;                                    // Fallback
}
```

**Maintenance Rule:** If you change the app manifest structure, update this function and add a test case.

### B. DN Registry

CPUX Engine maintains a registry of Design Nodes:

```javascript
// In cpux-engine.js
registerDN('DN_cart', function(inputPulses, context) { ... });
registerDN('DN_LLM_Advisor', function(inputPulses, context) { ... });

// In manifest, ICs reference by name
{
  "id": "IC_cart",
  "dn": "DN_cart",        // Must match registered name
  ...
}
```

**Maintenance Rule:** When adding new DNs:

1. Register in `cpux-engine.js` DN_REGISTRY section
2. Add to `getRegisteredDNs()` output for debugging
3. Document expected input Pulses and output Pulses

### C. Signal References

ICs reference Signals by name in the manifest:

```javascript
// In cpux manifest
"signals": {
  "S_trig": { "intentionId": "I_trig", "pulses": [...] },
  "S_disp": { "intentionId": "I_cart_display", "pulses": [...] }
},
"ics": [{
  "designatedInput": "S_trig",      // References signals.S_trig
  "designatedRelease": "S_disp",    // References signals.S_disp
}]
```

**Maintenance Rule:** If you rename a Signal, update ALL IC references. The engine validates these at build time.

## 6. Common Failure Modes & Solutions

### "GridLookout not rendering"

| Cause | Check | Fix |
|-------|-------|-----|
| Scene extraction failed | `extractScene()` returned wrong shape | Verify manifest has `scene.cells` or top-level `cells` |
| Renderer not loaded | `window.GridLookoutRenderer` is undefined | Ensure `gridlookout-renderer.js` loads before engine |
| Schema validation failed | Check browser console for validation errors | Fix cell properties to match schema |

### "CPUX not responding to clicks"

| Cause | Check | Fix |
|-------|-------|-----|
| Cells not registered | Missing `gl:register-cells` message | Verify `SchemaAdapter._render()` registers all cells |
| IC not built | `cpux:ready` shows fewer ICs than expected | Check dn references match registered DNs |
| DN not registered | `cpux:warnings` shows "DN not registered" | Add `registerDN()` call in `cpux-engine.js` |
| WebSocket not connected | `state.cpuxWS.readyState !== 1` | Check CPUX engine is running and URL is correct |

### "LLM IC not working"

| Cause | Check | Fix |
|-------|-------|-----|
| DN_LLM_Advisor not registered | `getRegisteredDNs()` doesn't include it | Register in `cpux-engine.js` v1.2+ |
| Trigger IC vs DN IC confusion | `dn: null` vs `dn: "DN_LLM_Advisor"` | Trigger ICs (`dn: null`) don't execute logic, they just forward |
| Field not available | `theField` is null when DN runs | Ensure CPUX has fully started before DN executes |

## 7. Version Compatibility Matrix

| Component | Version | Compatible With | Notes |
|-----------|---------|-----------------|-------|
| GridLookout Schema | 1.1 | GridLookout Engine 1.x, 2.x | Core schema stable |
| GridLookout Engine | 2.0.0 | Schema 1.1 | Added PerceptionModeController |
| CPUX Engine | 1.1 | is-core.js compatible | Basic DN support |
| CPUX Engine | 1.2 | is-core.js + DN registry v2 | Added DN validation, LLM support |
| App Manifest | 2.0 | GridLookout 1.1 + CPUX 1.2 | Combined structure |

## 8. Testing Checklist

When making changes, verify:

- [ ] **First Contact:** Backend sends valid IPTP signal
- [ ] **Scene Rendering:** GridLookout displays all cells correctly
- [ ] **Cell Actions:** Clicking action cells sends `gl:cell-action`
- [ ] **CPUX Processing:** CPUX receives actions and processes through ICs
- [ ] **State Updates:** CPUX sends `cpux:cell-update` and GridLookout refreshes
- [ ] **Perception Modes:** ACT, RESUME, RESET, COMMIT all work correctly
- [ ] **Error Handling:** Invalid manifests produce clear error messages
- [ ] **Backward Compatibility:** Old manifests still work (or version check fails gracefully)

## 9. Quick Reference: File Responsibilities

| File | Responsibility | Don't Modify Unless... |
|------|----------------|------------------------|
| `gridlookout-1_1_schema.json` | GridLookout cell validation | Adding new cell types or visual properties |
| `gridlookout-renderer.js` | DOM rendering of cells | Changing how cells look or adding render modes |
| `gridlookout-engine.js` | WebSocket bridge, cell registry | Changing wire protocol or First Contact handling |
| `cpux-engine.js` | CPUX runtime, DN registry | Adding DNs or changing IC execution logic |
| `cpux-engine-v1.2.js` | Enhanced CPUX with validation | You need DN validation or LLM support |
| `shopping-cart-app.json` | App manifest (data only) | Changing app structure (not engine logic) |
| `mock-backend.js` | Test backend for First Contact | Testing different bootstrap scenarios |

## 10. Key Architectural Principles

1. **GridLookout is the native layer** — It exists before any app, survives app crashes, and maintains the WebSocket bridge.

2. **CPUX is ephemeral** — It can be restarted without losing GridLookout state. The FieldBoard can be reconstructed from persistence.

3. **Manifest is declarative** — The app manifest describes *what* (ICs, cells, bindings), not *how* (execution order is determined by the Field).

4. **DNs are pure functions** — A DN receives input Pulses and context, returns output Pulses. No side effects, no direct DOM access.

5. **All state flows through Pulses** — Cells don't hold state; they reflect Pulse responses from the Field.

---

**Document Version:** 1.0  
**Last Updated:** 2026-04-05  
**Maintainer:** Future Developer (That's You!)