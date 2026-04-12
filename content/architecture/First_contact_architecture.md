# First Contact Architecture

## Overview

The First Contact protocol defines how a Perceptive App bootstraps itself from a bare GridLookout state to a fully functional application. The architecture separates concerns between UI rendering (GridLookout), computation (CPUX engine), and the manifest that binds them together.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FIRST CONTACT LIFECYCLE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐     WebSocket      ┌──────────────┐                      │
│  │   Backend    │ ─────────────────> │   Browser    │                      │
│  │              │   first-contact    │              │                      │
│  └──────────────┘                    └──────┬───────┘                      │
│                                             │                                │
│                              ┌──────────────┴──────────────┐                │
│                              │                             │                │
│                    ┌─────────▼─────────┐    ┌──────────────▼──────┐        │
│                    │ ManifestAdapter   │    │ GridLookoutRenderer │        │
│                    │                   │    │                     │        │
│                    │ • Validates       │    │ • Renders scene     │        │
│                    │ • Normalizes      │    │ • Displays cells    │        │
│                    │ • Routes to CPUX  │    │ • Handles actions   │        │
│                    └─────────┬─────────┘    └─────────────────────┘        │
│                              │                                              │
│                    ┌─────────▼─────────┐                                   │
│                    │  CPUX Engine      │                                   │
│                    │                   │                                   │
│                    │ • Builds ICs      │                                   │
│                    │ • Runs Golden Pass│                                   │
│                    │ • Updates cells   │                                   │
│                    └───────────────────┘                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. The Manifest

The manifest is the single source of truth that defines the entire application.

### Structure

```json
{
  "app": "shopping-cart",
  "version": "2.0-core",
  "scene": {           // GridLookout UI definition
    "schemaName": "GridLookout",
    "schemaVersion": "1.1",
    "cells": [...]     // UI cells with initial state
  },
  "cpux": {            // Computation engine configuration
    "id": "cpux",
    "mode": "frontend",
    "signals": {...},  // Signal templates
    "ics": [...],      // Intention Containers
    "triggerSignal": {...}
  }
}
```

### Scene Cells

Each cell defines:
- **cellId**: Unique identifier
- **pulsePhrase**: The semantic phrase this cell represents
- **tv**: Trivalence (Y=human authority, N=system fixed, UN=undetermined)
- **response**: Initial display content
- **visual**: Position, size, input method
- **render**: How to render head/body
- **binding**: Connection to CPUX ICs

```json
{
  "cellId": "cell_prod_P001",
  "pulsePhrase": "prod_P001",
  "tv": "Y",
  "response": ["Wireless Headphones - $89.99"],
  "visual": {
    "position": {"startCell": [4, 1], "span": [1, 5]},
    "inputMethod": "display"
  },
  "render": {"headMode": "responseFirst", "bodyMode": "responseHidden"}
}
```

### CPUX Configuration

**Signals** define pulse templates:
```json
"S_disp": {
  "intentionId": "I_cart_display",
  "pulses": [
    {"phrase": "cart_items", "tv": "UN"},
    {"phrase": "cart_total", "tv": "UN"}
  ]
}
```

**Intention Containers (ICs)** define computation units:
```json
{
  "id": "IC_cart",
  "holder": "Oh_cart",
  "dn": "DN_cart",           // null for trigger ICs
  "reflector": "Or_cart",
  "designatedInput": "S_act",
  "designatedRelease": "S_disp",
  "runOnce": false,
  "extractMode": "copy"
}
```

---

## 2. First Contact Protocol

### Phase 1: Backend → Browser (First Contact Signal)

The backend sends an IPTP Signal containing the manifest and CPUX URL:

```json
{
  "type": "first-contact",
  "intentionId": "I_first_contact",
  "pulses": {
    "app_manifest": {"tv": "Y", "responses": ["{...manifest JSON...}"]},
    "cpux_url": {"tv": "Y", "responses": ["ws://localhost:3000"]},
    "session_id": {"tv": "Y", "responses": ["sess_123"]}
  }
}
```

### Phase 2: ManifestAdapter Processing

The `ManifestAdapter` processes First Contact:

1. **Extract** manifest from the signal
2. **Validate** structure against schema
3. **Normalize** cell defaults (viewport, grid, style)
4. **Route** scene to GridLookoutRenderer
5. **Route** cpux config to CPUX engine

```javascript
var adapter = new ManifestAdapter({
  logLevel: 'info',
  validateDNs: false  // CPUX validates server-side
});

adapter.onSceneReady = function(scene) {
  GridLookoutRenderer.renderFromObject('grid-container', scene);
};

adapter.onCPUXReady = function(cpux) {
  // Store for later when CPUX connection is ready
  pendingCPUX = cpux;
};

var result = adapter.processFirstContact(signal);
```

### Phase 3: GridLookoutRenderer

Renders the scene immediately using the manifest's initial `response` values:

```javascript
GridLookoutRenderer.renderFromObject('grid-container', scene);
```

Cells display their content **before any CPUX interaction**.

### Phase 4: CPUX Engine Connection

Browser connects to CPUX engine via WebSocket:

```javascript
// 1. Send manifest to CPUX
cpuxWS.send(JSON.stringify({
  type: 'gl:init-cpux',
  cpux: cpuxConfig
}));

// 2. Register cells with bindings
cpuxWS.send(JSON.stringify({
  type: 'gl:register-cells',
  cells: [...]
}));

// 3. CPUX starts running
```

---

## 3. CPUX Engine Architecture

### Components

```
┌─────────────────────────────────────────────────────────┐
│                    CPUX Engine                           │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐ │
│  │   Signals   │───>│    ICs      │───>│     DNs     │ │
│  │             │    │             │    │             │ │
│  │ • S_trig    │    │ • IC_trig   │    │ • DN_cart   │ │
│  │ • S_disp    │    │ • IC_cart   │    │             │ │
│  │ • S_act     │    │             │    │             │ │
│  └─────────────┘    └──────┬──────┘    └─────────────┘ │
│                            │                            │
│                     ┌──────┴──────┐                     │
│                     │   Field     │                     │
│                     │             │                     │
│                     │ • Holders   │                     │
│                     │ • Reflectors│                     │
│                     └─────────────┘                     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Signal Flow

1. **Cell Action** → `gl:cell-action` message
2. **GridLookoutBridge** creates Signal with pulses
3. **IC activates** with the Signal
4. **Holder accumulates** perception
5. **DN executes** (if present)
6. **Reflector releases** output Signal
7. **Cell updates** via `cell:update` event

### Golden Pass

The Golden Pass is the continuous execution loop:

```
┌────────────────────────────────────────┐
│           GOLDEN PASS                  │
├────────────────────────────────────────┤
│                                        │
│  1. Visitor scans ICs in sequence      │
│  2. For each IC in "Ready" state:      │
│     - Extract pulses from Field        │
│     - Activate IC with Signal          │
│     - DN executes (if present)         │
│     - Reflector releases output        │
│     - Emit ic:pickup event             │
│  3. Repeat indefinitely                │
│                                        │
└────────────────────────────────────────┘
```

---

## 4. Direct Intention Flow (UI → DN)

### Action Cell Binding

```json
{
  "cellId": "cell_add_P001",
  "pulsePhrase": "add_P001",
  "visual": {"inputMethod": "action"},
  "binding": {
    "receptorICId": "IC_cart",
    "receptorCPUXId": "cpux",
    "actionIntentionId": "I_cart_action"
  }
}
```

### Flow

```
User clicks "+" button
         │
         ▼
┌─────────────────┐
│ GridLookout     │
│ onCellAction()  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ gl:cell-action  │
│ WebSocket msg   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ CPUX Engine     │
│ handleCellAction│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ IC_cart         │
│ activate()      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ DN_cart         │
│ execute()       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Or_cart         │
│ reflect()       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ ic:pickup event │
│ cell:update     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Browser         │
│ updateCell()    │
└─────────────────┘
```

---

## 5. Cell Update Subscription

Display cells subscribe to IC updates:

```json
{
  "cellId": "cell_items",
  "pulsePhrase": "cart_items",
  "binding": {
    "subscribe": [
      {"icId": "IC_cart", "intentionId": "I_cart_display"}
    ]
  }
}
```

When `IC_cart` emits a Signal with `intentionId: "I_cart_display"`, the `GridLookoutBridge`:

1. Matches the intentionId to subscriptions
2. Extracts the pulse matching `cell.pulsePhrase`
3. Emits `cell:update` event
4. Browser calls `GridLookoutRenderer.updateCell()`

---

## 6. Key Principles

### Separation of Concerns

| Component | Responsibility |
|-----------|---------------|
| **Manifest** | Single source of truth for app definition |
| **GridLookout** | UI rendering, cell display, action capture |
| **ManifestAdapter** | Validation, normalization, routing |
| **CPUX Engine** | Computation, state management, DN execution |
| **DN** | Business logic (cart operations, LLM, etc.) |

### Data Flow

```
Manifest (static)
    │
    ├──> Scene ──> GridLookoutRenderer ──> Initial UI
    │
    └──> CPUX ───> Build ICs ──> Golden Pass ──> Live updates
```

### Trivalence (TV)

- **Y** (Yes): Human authority - user has confirmed
- **N** (No): System fixed - computed, deterministic
- **UN** (Undetermined): Awaiting computation or user input

### DN Registry Pattern

```javascript
// Engine registers DNs by name
registerDN('DN_cart', function(inputPulses, context) {
  // Business logic here
  return Promise.resolve([new Pulse(...), ...]);
});

// Manifest references DN by name
{"id": "IC_cart", "dn": "DN_cart", ...}
```

---

## 7. File Structure

```
project/
├── index.html              # Browser entry point
├── gridlookout-renderer.js # GridLookout rendering engine
├── cpux-manifest-adapter.js # First Contact processing
├── cpux-manifest-validator.js # Schema validation
├── cpux-engine-core.js     # CPUX engine (server-side)
├── is-core.js              # Intention-Space library
├── shopping-cart-core.json # Application manifest
└── mock-backend-core.js    # Test backend
```

---

## 8. Startup Sequence

```
1. Browser loads index.html
   └── GridLookoutRenderer, ManifestAdapter ready

2. User clicks "Initiate First Contact"
   └── WebSocket connects to backend

3. Backend sends first-contact signal
   └── Contains manifest + cpux_url

4. ManifestAdapter.processFirstContact()
   ├── Validates manifest
   ├── Fires onSceneReady(scene)
   │   └── GridLookoutRenderer.renderFromObject()
   │       └── UI displays with initial responses
   └── Fires onCPUXReady(cpux)
       └── Stores config for later

5. Browser connects to CPUX engine
   └── WebSocket to cpux_url

6. Browser sends gl:init-cpux
   └── CPUX builds ICs from manifest

7. Browser sends gl:register-cells
   └── CPUX wires cell subscriptions

8. CPUX starts Golden Pass
   └── ICs begin processing

9. User interacts with cells
   └── Direct intention flow → DN → Cell updates
```

---

## 9. Extension Points

### Adding a New DN

1. Implement DN function in engine:
```javascript
registerDN('DN_new', function(inputPulses, context) {
  // Your logic
  return Promise.resolve([new IS.Pulse(...)]);
});
```

2. Reference in manifest:
```json
{"id": "IC_new", "dn": "DN_new", ...}
```

3. Bind cell to IC:
```json
{"cellId": "cell_new", "binding": {"receptorICId": "IC_new", ...}}
```

### Adding Product Display

Add cells with `inputMethod: "display"` and initial `response`:

```json
{
  "cellId": "cell_prod_P001",
  "pulsePhrase": "prod_P001",
  "tv": "Y",
  "response": ["Wireless Headphones - $89.99"],
  "visual": {"inputMethod": "display", ...},
  "render": {"headMode": "responseFirst", "bodyMode": "responseHidden"}
}
```

---

## 10. Debugging

### Browser Console

```javascript
// Check rendered cells
GridLookoutRenderer.getAllCellIds()

// Get cell data
GridLookoutRenderer.getCellData('cell_items')

// Check element
GridLookoutRenderer.getCellElement('cell_items')
```

### Engine Logs

```
[CPUX] Building from manifest: cpux (2 ICs)
[IC] IC[0] "IC_trig": trigger
[IC] IC[1] "IC_cart": DN "DN_cart"
[CPUX] Registered 10 cells
[CPUX] Starting CPUX "cpux" (mode: frontend)
[GRID] cell:update cell_items phrase=cart_items tv=Y
[DN] DN_cart: 1 items, $89.99 | cart keys: [P001]
```

---

## Summary

The First Contact architecture enables:

1. **Declarative UI**: Manifest defines initial state
2. **Reactive Updates**: CPUX engine updates cells via subscriptions
3. **Clean Separation**: UI rendering independent of computation
4. **Extensible**: New DNs add functionality without changing core
5. **Observable**: Full traceability via events and logging

The key insight: **The manifest is the app**. Everything else (renderer, engine, DNs) interprets and executes the manifest.
