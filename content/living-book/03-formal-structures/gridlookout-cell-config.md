---
title: GridLookout Cell Config
order: 8
description: A first canonical structure for configuring a GridLookout Cell across ReactJS, Android, iOS, Flutter, and other rendering platforms.
---

# GridLookout Cell Config

GridLookout is the cross-platform UI contract for Perceptive Apps.

A Cell is a native rendering surface bound to a Pulse, a Signal-producing action, a receptor IC, and optional subscriptions.

```json
{
  "cellId": "username_input",
  "pulsePhrase": "username",
  "receptor": {
    "cpuxId": "CPUX_login",
    "icId": "IC_validate_login",
    "actionIntentionId": "I_validate_login"
  },
  "interaction": {
    "kind": "text-input",
    "perceptionMode": "act"
  },
  "subscribe": [
    {
      "icId": "IC_validate_login",
      "intentionId": "I_reflect_login_result",
      "pulsePhrase": "credentials valid"
    }
  ]
}
```

---

## Platform-Neutral Core

The core should remain platform-neutral:

- `cellId`
- `pulsePhrase`
- `receptor`
- `interaction`
- `subscribe`

ReactJS, Android, iOS, Flutter, desktop, and embedded renderers can map these fields into native widgets.

---

## Receptor

The receptor tells the Cell where to send the human action:

```json
"receptor": {
  "cpuxId": "CPUX_login",
  "icId": "IC_validate_login",
  "actionIntentionId": "I_validate_login"
}
```

The Cell does not decide hidden business logic. It constructs and sends a Signal to the declared receptor.

---

## Interaction

Interaction describes the native UI behaviour:

```json
"interaction": {
  "kind": "text-input",
  "perceptionMode": "act"
}
```

Possible kinds may include:

```text
text-input
button
toggle
picker
slider
grid-cell
canvas-region
sensor-surface
```

The exact rendering is platform-specific.

---

## Subscription

Subscriptions define how the Cell receives reflected updates:

```json
"subscribe": [
  {
    "icId": "IC_validate_login",
    "intentionId": "I_reflect_login_result",
    "pulsePhrase": "credentials valid"
  }
]
```

This supports three-level filtering:

```text
IC id -> Intention id -> Pulse phrase
```

---

## Sample Anchor: Green Light Cell

The same pattern can drive a simple Green Light sample:

```json
{
  "cellId": "light_control",
  "pulsePhrase": "current light",
  "receptor": {
    "cpuxId": "CPUX_green_light",
    "icId": "IC_move_if_allowed",
    "actionIntentionId": "I_move_if_allowed"
  },
  "interaction": {
    "kind": "toggle",
    "perceptionMode": "act"
  },
  "subscribe": [
    {
      "icId": "IC_move_if_allowed",
      "intentionId": "I_reflect_movement_state",
      "pulsePhrase": "movement allowed"
    },
    {
      "icId": "IC_move_if_allowed",
      "intentionId": "I_reflect_movement_state",
      "pulsePhrase": "current position"
    }
  ]
}
```

In React this may render as a toggle and a small board.

In Android it may render as native Material controls.

In iOS, Flutter, or another renderer it should still preserve the same CPUX/UI mode convention: the Cell creates a Signal, the receptor IC receives it, and reflected Pulses come back through direct result or subscription.

---

## Direct Result

When the Cell sends a Signal to its receptor IC, it should receive the direct IC result from O_reflector.

That direct result is separate from subscription updates.

This preserves immediate human feedback while the wider CPUX Field continues to stabilise.

---

## Developer Rule

GridLookout config should describe perception and routing.

It should not hide validation, correction, or transformation that belongs in a Design Node.
