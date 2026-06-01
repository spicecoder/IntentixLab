---
title: GridLookout Rendering Contract
order: 3
description: The platform-neutral rendering contract that allows GridLookout Cells to run as native surfaces while CPUX remains independent of pixels.
---

# GridLookout Rendering Contract

GridLookout is a rendering contract, not one particular UI library.

The same Perceptive App may be rendered by:

- a browser Custom Element
- a React component tree
- an Android ViewGroup
- an iOS UIView tree
- a Flutter RenderObject or widget
- a desktop surface
- an embedded display

Each renderer may be native to its platform. The contract is the shared geometry and Signal boundary.

## The Standard Cell Shape

A GridLookout Cell needs enough information to be placed, painted, and connected to CPUX.

```json
{
  "cellId": "pack_travel_bag_001",
  "pulsePhrase": "Black Travel Bag Near Window",
  "visual": {
    "grid": { "rows": 10, "columns": 10 },
    "layer": 1,
    "position": {
      "startCell": [2, 2],
      "span": [4, 4]
    },
    "renderer": "image-card"
  },
  "interaction": {
    "kind": "focusable-cell",
    "perceptionMode": "act"
  },
  "binding": {
    "receptorICId": "IC_belonging_context",
    "actionIntentionId": "I_focus_belonging",
    "subscribe": [
      {
        "icId": "IC_belonging_context",
        "intentionId": "I_reflect_belonging",
        "pulsePhrase": "Black Travel Bag Near Window"
      }
    ]
  }
}
```

The field names may evolve, but the responsibilities should remain stable.

## Contract Boundaries

| Layer | Owns | Must not own |
|---|---|---|
| GridLookout manifest | Cell identity, grid placement, interaction, CPUX binding | Platform-specific painting internals |
| Geometry orchestrator | Projection from grid to native bounds | Business logic |
| Native cell renderer | Internal drawing and input capture inside its assigned boundary | External layout position |
| CPUX engine | FieldBoard, ICs, DNs, Signals, reflected state | Pixels, media queries, native view lifecycle |

This is the separation that lets GridLookout and CPUX evolve independently.

## Passive-Receptive Surface Rule

A native cell renderer must be passive-receptive:

1. It receives a boundary from the geometry orchestrator.
2. It fills that boundary.
3. It handles internal rendering proportionally.
4. It emits user gestures or inputs as Signals.
5. It accepts reflected updates through subscriptions.

It does not move itself in the outer layout.

## Three-Level Update Filtering

When CPUX reflects a result, GridLookout applies updates only when the subscription matches:

```text
IC id -> Intention id -> Pulse phrase
```

This prevents accidental visual updates from unrelated computation.

## Focus Transformations

GridLookout can support focus without surrendering geometry control.

A tap may request a dynamic frame transformation:

```text
cell grid rectangle -> full surface rectangle
```

A double tap or restore gesture may return:

```text
full surface rectangle -> original cell grid rectangle
```

The important rule is that this transformation happens at the orchestrator level. The child renderer still receives a boundary and paints inside it.

## Rendering Is Native, Semantics Are Shared

React can use state and JSX.

Android can use `ViewGroup.onMeasure()` and `onLayout()`.

Web Components can use CSS custom properties and Shadow DOM.

Those are implementation details. The shared semantic contract is:

```text
Pulse Cell + grid position + receptor binding + subscription
```

That is the GridLookout rendering contract.
