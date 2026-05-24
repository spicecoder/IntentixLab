---
title: AutoInteraction Test Path
order: 6
description: A sample testing pattern where an autonomous DN drives CPUX through represented Signals and verifies reflected Pulse responses.
---

# AutoInteraction Test Path

AutoInteraction can be used as a higher-fidelity testing pattern.

The test does not need to inspect proprietary CPUX internals.

It can drive the public Signal path and verify reflected responses.

---

## Test Goal

The test should verify two things:

```text
1. O_reflector structural match succeeds.
2. Reflected Pulse response values are correct.
```

The first level checks the emitted Signal shape.

The second level checks meaning in the response values.

---

## Test Driver Signal

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
    },
    {
      "phrase": "_perception_mode",
      "tv": "Y",
      "response": ["act"]
    }
  ]
}
```

This is the same kind of Signal a UI Cell could construct.

The AutoInteraction test DN drives the represented interaction path instead of clicking pixels.

---

## Expected Reflected Signal

```json
{
  "intention": {
    "id": "I_reflect_movement_state"
  },
  "pulses": [
    {
      "phrase": "movement allowed",
      "tv": "Y",
      "response": ["true"]
    },
    {
      "phrase": "current position",
      "tv": "Y",
      "response": ["4"]
    }
  ]
}
```

The test can verify:

```text
movement allowed = Y / true
current position = 4
```

---

## Test Sketch

```javascript
async function testGreenLightMovement(cpuxClient) {
  const result = await cpuxClient.sendCellAction({
    cpuxId: "CPUX_green_light",
    icId: "IC_move_if_allowed",
    signal: {
      intention: { id: "I_move_if_allowed" },
      pulses: [
        { phrase: "current light", tv: "Y", response: ["green"] },
        { phrase: "current position", tv: "Y", response: ["3"] },
        { phrase: "_perception_mode", tv: "Y", response: ["act"] }
      ]
    }
  });

  assertPulse(result.directResult, "movement allowed", "Y", "true");
  assertPulse(result.directResult, "current position", "Y", "4");
}
```

This tests the public behaviour.

It does not depend on the proprietary Visitor or Field implementation.

---

## Developer Rule

Use AutoInteraction tests to verify actual reflected responses after structural Signal validation succeeds.

That keeps testing faithful to CPUX without exposing private engine code.

