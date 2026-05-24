---
title: LLM As Design Node
order: 5
description: A sample showing how an LLM can participate as a Design Node by absorbing a Signal and emitting a reflected Signal contract.
---

# LLM As Design Node

An LLM can participate in CPUX as a Design Node.

It should not become an invisible authority outside the Field.

It should absorb a Signal, reason within that bounded context, and emit a Signal that O_reflector can validate.

---

## Input Signal

Example:

```json
{
  "intention": {
    "id": "I_explain_movement_state"
  },
  "pulses": [
    {
      "phrase": "current light",
      "tv": "Y",
      "response": ["red"]
    },
    {
      "phrase": "current position",
      "tv": "Y",
      "response": ["4"]
    },
    {
      "phrase": "movement allowed",
      "tv": "N",
      "response": ["false"]
    }
  ]
}
```

The LLM is not asked to infer from an unbounded conversation.

It receives a represented situation.

---

## DN Prompt Boundary

A CPUX-facing LLM DN can be prompted with the Signal contract:

```text
You are a Design Node in CPUX.
Absorb the input Signal.
Emit only the expected result Signal.
Do not invent Pulse phrases.
Do not alter the input Signal.
```

The output expectation may be:

```json
{
  "intentionId": "I_reflect_movement_explanation",
  "requiredPulses": [
    "movement explanation",
    "next human action suggested"
  ]
}
```

---

## Expected Output Signal

```json
{
  "intention": {
    "id": "I_reflect_movement_explanation"
  },
  "pulses": [
    {
      "phrase": "movement explanation",
      "tv": "Y",
      "response": ["Movement stopped because the current light is red."]
    },
    {
      "phrase": "next human action suggested",
      "tv": "Y",
      "response": ["Wait until the light becomes green."]
    }
  ]
}
```

O_reflector validates that this emitted Signal matches the designated output before reflecting it to the Field or UI.

---

## Why This Matters

The LLM is powerful, but CPUX keeps it situated.

The model participates through:

- a bounded input Signal
- a declared Intention
- known Pulse phrases
- a designated output expectation
- O_reflector validation
- Field-visible reflection

This gives a safer and more inspectable role than allowing the LLM to mutate app state directly.

---

## Developer Rule

Treat the LLM as a DN.

Do not let it bypass Signal contracts, O_reflector validation, or Field stabilisation.

