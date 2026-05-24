---
title: React GridLookout Green Light
order: 3
description: A React-facing sample showing how a GridLookout component can emit a Signal into CPUX without exposing engine internals.
---

# React GridLookout Green Light

This sample shows how a React component can act as a GridLookout surface.

It does not include proprietary CPUX engine code.

It shows only the public-facing idea:

```text
React Cell state -> Signal -> CPUX action API -> direct result
```

For runnable React reference instructions, use [Runnable Samples And SDK Boundary](/living-book/05-samples/runnable-samples-sdk-boundary.html). The tested reference app lives in:

```text
iscore-cpux-platform-reference/react-pulse-cpux-app-v0_3
```

---

## Cell Configuration

A React GridLookout Cell can be described by configuration:

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
      "pulsePhrase": "current position"
    }
  ]
}
```

---

## React Component Sketch

```jsx
function LightControlCell({ cpuxClient }) {
  const [light, setLight] = React.useState("green");
  const [position, setPosition] = React.useState("0");

  async function sendAction(nextLight) {
    setLight(nextLight);

    const signal = {
      intention: { id: "I_move_if_allowed" },
      pulses: [
        { phrase: "current light", tv: "Y", response: [nextLight] },
        { phrase: "current position", tv: "Y", response: [position] },
        { phrase: "_perception_mode", tv: "Y", response: ["act"] }
      ]
    };

    const result = await cpuxClient.sendCellAction({
      cpuxId: "CPUX_green_light",
      icId: "IC_move_if_allowed",
      signal
    });

    const reflectedPosition = readPulse(result.directResult, "current position");
    if (reflectedPosition) {
      setPosition(reflectedPosition.response[0]);
    }
  }

  return (
    <section>
      <button onClick={() => sendAction("green")}>Green</button>
      <button onClick={() => sendAction("red")}>Red</button>
      <p>Light: {light}</p>
      <p>Position: {position}</p>
    </section>
  );
}
```

This is not an engine implementation.

The `cpuxClient.sendCellAction` call represents a public bridge into the CPUX frontend runtime.

---

## Direct Result

The React Cell expects the direct IC result:

```json
{
  "type": "cpux:action-result",
  "accepted": true,
  "directResult": {
    "intention": {
      "id": "I_reflect_movement_state"
    },
    "pulses": [
      {
        "phrase": "current position",
        "tv": "Y",
        "response": ["4"]
      }
    ]
  }
}
```

The originating Cell does not need to wait for polling or Field subscription to receive its own result.

---

## Developer Rule

Keep React responsible for rendering and Signal construction.

Keep CPUX responsible for IC activation, reflection, Field absorption, and Visitor behaviour.
