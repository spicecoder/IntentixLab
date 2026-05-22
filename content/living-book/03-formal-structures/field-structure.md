---
title: Field Structure
order: 7
description: A first canonical structure for representing a CPUX Field as accumulated Intentions, Pulses, and traceable pickup history.
---

# Field Structure

A Field is the evolving situational state of a CPUX.

It accumulates reflected Intentions and Pulses.

```json
{
  "id": "Field_login_001",
  "cpuxId": "CPUX_login",
  "fis": ["I_reflect_username", "I_reflect_login_result"],
  "fps": {
    "username": {
      "phrase": "username",
      "tv": "Y",
      "response": ["alice"]
    },
    "credentials valid": {
      "phrase": "credentials valid",
      "tv": "N",
      "response": ["false"]
    }
  },
  "pickupHistory": [
    {
      "seqNo": 1,
      "icId": "IC_username",
      "signalId": "S_username_reflected"
    },
    {
      "seqNo": 2,
      "icId": "IC_validate_login",
      "signalId": "S_login_result"
    }
  ]
}
```

---

## FIS

FIS means Field Intention Set.

It records Intentions reflected into the Field:

```json
"fis": ["I_reflect_username", "I_reflect_login_result"]
```

---

## FPS

FPS means Field Pulse Set.

It records the current Pulse state by phrase:

```json
"fps": {
  "username": {
    "phrase": "username",
    "tv": "Y",
    "response": ["alice"]
  }
}
```

The current working rule is latest TV wins for the same Pulse phrase inside the Field.

---

## Pickup History

Pickup history preserves ordered absorption:

```json
"pickupHistory": [
  {
    "seqNo": 1,
    "icId": "IC_username",
    "signalId": "S_username_reflected"
  }
]
```

This supports debugging, replay, and causality inspection.

---

## Developer Rule

Do not treat the Field as a generic mutable store.

It is a represented situational state created through reflected Signals.

