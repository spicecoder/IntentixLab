---
title: Building IS-Perceptive React Apps with IS-Core
subtitle: A practical introduction for React developers
description: "React becomes the perceptive surface: it renders Pulses, captures raw human input, and sends Signals to IS-Core without mutating meaning. IS-Core owns intention routing, DN execution, Field state, and reflected updates."
order: 2
---

# Building IS-Perceptive React Apps with IS-Core

**A practical introduction for React developers**

**Pronab Pal**  
IntentixLab, Melbourne, Australia  
*Version 1.0 — May 2026*

---

## 1. Why React Developers Should Care

React is excellent at rendering user interfaces and managing local interaction state. But in most React applications, components quietly accumulate too many responsibilities:

- capturing user input
- validating values
- normalising values
- deciding what action means
- updating application state
- coordinating backend calls
- deriving business results

This makes applications productive at first, but increasingly difficult to inspect, replay, test, or port across platforms.

An **IS-Perceptive React App** keeps React productive while moving application meaning into explicit Intention Space structures.

React remains the rendering layer.

IS-Core becomes the intention/runtime layer.

The key shift is simple:

> **React does not decide what the user meant. React preserves what the user did.**

---

## 2. The Core Rule

In an IS-Perceptive React app:

```text
React captures raw human input.
React sends that input unchanged as a Pulse.
Only a DN may transform, derive, validate, or interpret meaning.
```

This is the most important discipline.

Allowed in React:

- hold the typed value temporarily
- render the typed value
- send the value exactly as entered
- render the reflected DN result

Not allowed in React:

- trim before sending
- convert case before sending
- silently validate
- derive business state
- mutate the response outside the DN
- decide the semantic result of an action

If transformation is needed, it belongs in the DN.

---

## 3. The Runtime Picture

A React component interacts with IS-Core through a cell action.

```text
React Pulse Component
    ↓
cell action
    ↓
Signal
    ↓
IS-Core /cell-action
    ↓
Intention Container
    ↓
O_holder
    ↓
DN
    ↓
O_reflector
    ↓
direct reflected result
    ↓
React re-render
```

The same reflected Signal may also be absorbed into the CPUX Field, where the Visitor handles cross-IC causality.

So there are two complementary paths:

```text
Direct path:
React action → receptor IC → direct reflected result → same component or subscribed cells

Field path:
O_reflector pickup → Field absorption → Visitor → downstream ICs
```

The direct path gives immediate UI response.

The Field path preserves CPUX sequencing and causality.

---

## 4. The Main Concepts

### Pulse

A Pulse is the smallest perceptual unit.

```json
{
  "phrase": "todo_text",
  "tv": "Y",
  "responses": ["buy milk"]
}
```

The phrase gives semantic identity.

The trivalence value gives perceptual status:

```text
Y  = affirmed / present
N  = negated / not active
UN = unresolved / not yet known
```

The response array carries data.

### Signal

A Signal pairs an Intention with Pulses.

```json
{
  "intentionId": "I_todo_submit",
  "pulses": [
    {
      "phrase": "todo_text",
      "tv": "Y",
      "responses": ["buy milk"]
    },
    {
      "phrase": "_perception_mode",
      "tv": "Y",
      "responses": ["act"]
    }
  ]
}
```

Traditional applications hide this communication inside callbacks and API calls.

IS-Core gives it an explicit identity.

### Intention Container

An Intention Container is the runtime receptor.

```text
O_holder → DN → O_reflector
```

The React component sends a Signal to the IC. The IC accumulates perception, runs the DN, and reflects the result.

### DN

The Design Node is where transformation happens.

A DN receives a Signal and emits a Signal.

```text
execute(inputSignal) → outputSignal
```

A DN may be a real function, an external service, a registered built-in behaviour, or later a language/runtime-specific executable.

### Field

The Field is the CPUX state.

It accumulates reflected Intentions and Pulses so that other ICs can activate through the Visitor.

React should not mutate the Field directly.

---

## 5. A Minimal Pulse Manifest

A generated single-Pulse React app can be described by one Pulse, one input Signal, one output Signal, one IC, and one DN registry entry.

```json
{
  "pulse": {
    "phrase": "todo_text",
    "tv": "UN",
    "responses": []
  },
  "inputSignal": {
    "id": "S_todo_submit",
    "intentionId": "I_todo_submit",
    "pulses": [
      {
        "phrase": "todo_text",
        "tv": "Y",
        "responses": []
      },
      {
        "phrase": "_perception_mode",
        "tv": "Y",
        "responses": ["act"]
      }
    ]
  },
  "emittedSignal": {
    "id": "S_todo_result",
    "intentionId": "I_todo_result",
    "pulses": [
      {
        "phrase": "todo_result",
        "tv": "Y",
        "responses": []
      }
    ]
  },
  "ic": {
    "id": "IC_todo",
    "holder": "OH_todo",
    "dn": "DN_Todo",
    "reflector": "OR_todo",
    "designatedInput": "S_todo_submit",
    "designatedRelease": "S_todo_result",
    "extractMode": "copy",
    "runOnce": false
  }
}
```

This is enough to generate a React component that behaves like a normal input form while remaining IS-compliant.

---

## 6. A React Pulse Component

A React component may keep local UI state, but that state is only temporary input capture.

```tsx
import * as React from "react";

type TV = "Y" | "N" | "UN";

type CellValue = {
  pulsePhrase: string;
  tv: TV;
  value: string;
};

type CellAction = {
  cellId: string;
  receptorICId: string;
  intentionId: string;
  perceptionMode: "act" | "commit" | "reset" | "resume";
  cellValues: CellValue[];
};

type Props = {
  sendCellAction: (action: CellAction) => Promise<void>;
};

export function TodoPulseComponent({ sendCellAction }: Props) {
  const [rawValue, setRawValue] = React.useState("");

  async function act() {
    await sendCellAction({
      cellId: "cell_todo",
      receptorICId: "IC_todo",
      intentionId: "I_todo_submit",
      perceptionMode: "act",
      cellValues: [
        {
          pulsePhrase: "todo_text",
          tv: "Y",
          value: rawValue
        }
      ]
    });
  }

  return (
    <section>
      <label>Todo text</label>
      <input
        value={rawValue}
        onChange={(event) => setRawValue(event.target.value)}
      />
      <button onClick={act}>Act</button>
    </section>
  );
}
```

Notice the discipline:

```text
rawValue is sent unchanged.
```

If the user typed:

```text
  buy milk  
```

React must send:

```text
  buy milk  
```

If trimming is desired, the DN must do it.

---

## 7. The IS-Core Bridge

The bridge sends cell actions to IS-Core.

```ts
export async function sendCellAction(action) {
  const response = await fetch("/cell-action", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: "cell-action",
      ...action
    })
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}
```

When IS-Core is serving the React app and the API from the same port, the browser can use relative paths:

```text
/cell-action
/init-cpux
/register-cells
/manifest
```

This allows one local or hosted process:

```text
http://localhost:3000
```

to serve both the React UI and CPUX API.

---

## 8. The Direct Result Contract

IS-Core returns a direct result after `/cell-action`.

```json
{
  "type": "cpux:action-result",
  "ack": {
    "type": "cpux:action-accepted"
  },
  "direct": {
    "type": "cpux:direct-ic-result",
    "fromIC": "IC_todo",
    "intentionId": "I_todo_result",
    "pulses": [
      {
        "phrase": "todo_result",
        "tv": "Y",
        "responses": [
          "{\"todos\":[\"buy milk\"]}"
        ]
      }
    ]
  },
  "directPulses": [
    {
      "phrase": "todo_result",
      "tv": "Y",
      "responses": [
        "{\"todos\":[\"buy milk\"]}"
      ]
    }
  ]
}
```

React renders from `directPulses`.

React does not need to know how the DN created the result.

---

## 9. Perception Modes

Every action carries a perception mode.

```text
act    = append or perform a normal perceptual action
commit = save or finalise, depending on manifest policy
resume = restore from persistence/checkpoint
reset  = clear accumulated state
```

A todo demo may use checkpoint semantics:

```text
Act    → append item to working list
Commit → save checkpoint but keep accepting input
Resume → restore checkpoint
Reset  → clear working state and checkpoint
```

A legal submission flow may use freeze semantics:

```text
Commit → finalise and reject further changes
```

The difference belongs in the manifest/DN policy, not in React.

Example DN registry entry:

```json
"x_dnRegistry": {
  "DN_Todo": {
    "type": "accumulateList",
    "inputPulse": "todo_text",
    "outputPulse": "todo_result",
    "outputSignal": "S_todo_result",
    "commitMode": "checkpoint"
  }
}
```

This keeps the React component unchanged while allowing different application semantics.

---

## 10. React as a Virtual GridLookout

Native GridLookout uses cells placed in a grid.

React can implement a virtual GridLookout by treating each component as a Pulse cell.

A cell has:

```text
cellId
pulsePhrase
visual placement
receptorICId
actionIntentionId
subscriptions
```

The component owns look and behaviour inside the cell.

IS-Core owns intention, transformation, reflection, and field state.

```text
GridLookout owns placement.
React owns rendering inside the cell.
IS-Core owns meaning.
```

This lets the same manifest support:

```text
Android native GridLookout
React virtual GridLookout
future desktop or embedded GridLookout
```

---

## 11. Running a Bundled React + IS-Core App

A typical generated app can be run as one process.

Build React:

```bash
npm install
npm run build
```

Start IS-Core and serve the static React build:

```bash
./start_iscore_bundled.sh
```

Open:

```text
http://localhost:3000
```

The same server exposes:

```text
/
 /manifest
 /health
 /init-cpux
 /register-cells
 /cell-action
 /poll-updates
```

For local browser safety, avoid restricted ports such as `6000`.

---

## 12. What React Developers Should Remember

Do not think:

```text
React component = application logic
```

Think:

```text
React component = perceptive surface
Pulse = semantic unit
Signal = user act
IC = runtime receptor
DN = transformation point
O_reflector = visible result
Field = CPUX state
```

This preserves the strengths of React while removing hidden application meaning from the UI layer.

React remains fast, familiar, and expressive.

IS-Core makes the application's intention structure explicit, inspectable, portable, and testable.

---

## 13. Why This Matters

An IS-Perceptive React app is still a React app.

It has components, inputs, buttons, CSS, and build tools.

But it also has an explicit semantic runtime.

Every action becomes a Signal.

Every semantic unit becomes a Pulse.

Every transformation happens in a DN.

Every reflected result can be traced.

This is the difference between a UI that merely reacts and a UI that participates in a perceptive architecture.

---

## Closing

> **In IS-Core, React does not decide what the user meant; React preserves what the user did.**

That is the foundation of IS-Perceptive React development.

It allows React developers to build normal-feeling applications while keeping intention, transformation, and state progression explicit in Intention Space.

---

*This note is a practical companion to the IS-Core runtime, the GridLookout native client work, and the broader Intention Space architecture.*
