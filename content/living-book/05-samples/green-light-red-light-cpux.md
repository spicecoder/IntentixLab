---
title: Green Light Red Light CPUX
order: 2
description: A small CPUX sample showing Field-driven repetition, golden pass, and stabilisation through a green light and red light sequence.
---

# Green Light Red Light CPUX

This sample demonstrates Field-driven repetition and golden pass.

It does not expose CPUX engine internals. It only shows the public contract between Signals, a Design Node, O_reflector expectations, and Field-visible results.

For runnable reference package instructions, see [Runnable Samples And SDK Boundary](/living-book/05-samples/runnable-samples-sdk-boundary.html).

---

## Scenario

A movement IC should repeat while the light is green.

It should stop when the light becomes red.

```text
green light -> movement continues
red light   -> movement stops
golden pass -> no more autonomous movement
```

---

## Input Signal

The IC is designed to receive a Signal under the intention:

```text
I_move_if_allowed
```

with a Pulse describing the current light:

```json
{
  "intention": {
    "id": "I_move_if_allowed"
  },
  "pulses": [
    {
      "phrase": "current light",
      "tv": "Y",
      "response": ["green"]
    },
    {
      "phrase": "current position",
      "tv": "Y",
      "response": ["3"]
    }
  ]
}
```

The designated input does not say:

```text
light = green
```

It says the IC needs a represented perception of:

```text
current light
```

The DN decides how to act on the actual value.

---

## Design Node Stub

The DN is shown here only as a public contract stub.

```javascript
export function execute(inputSignal) {
  const light = readPulse(inputSignal, "current light")?.response?.[0];
  const position = Number(readPulse(inputSignal, "current position")?.response?.[0] ?? 0);

  if (light === "green") {
    return {
      intention: { id: "I_movement_result" },
      pulses: [
        { phrase: "movement allowed", tv: "Y", response: ["true"] },
        { phrase: "current position", tv: "Y", response: [String(position + 1)] },
        { phrase: "continue movement", tv: "Y", response: ["true"] }
      ]
    };
  }

  return {
    intention: { id: "I_movement_result" },
    pulses: [
      { phrase: "movement allowed", tv: "N", response: ["false"] },
      { phrase: "current position", tv: "Y", response: [String(position)] },
      { phrase: "continue movement", tv: "N", response: ["false"] }
    ]
  };
}
```

The helper `readPulse` is only illustrative. The proprietary CPUX engine may provide its own runtime utility or adapter.

---

## O_reflector Expectation

O_reflector validates that the DN emits the expected output shape:

```json
{
  "designatedOutput": {
    "intentionId": "I_movement_result",
    "requiredPulses": [
      "movement allowed",
      "current position",
      "continue movement"
    ]
  },
  "reflectedSignal": {
    "intentionId": "I_reflect_movement_state"
  }
}
```

This provides structural confidence:

```text
DN emitted the right Intention + Pulse/TV set
```

Response-level tests can then check whether the actual values are correct.

---

## Field Behaviour

If the reflected Signal carries:

```text
continue movement = Y
```

then the next Visitor pass may find the movement IC eligible again.

If the reflected Signal carries:

```text
continue movement = N
```

then no further movement is eligible, and the Visitor can approach golden pass.

---

## What This Demonstrates

This sample shows:

- meta-level designated input
- DN value-level decision
- O_reflector output validation
- Field-driven repetition
- golden pass as stability

It is a minimal teaching sample, not a production engine implementation.
