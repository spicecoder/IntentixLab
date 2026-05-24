---
title: Field
order: 9
description: Field as the evolving situational state of a CPUX, formed from reflected Intentions and Pulses.
---

# Field

A Field is the evolving situational state of a CPUX.

It is created when a CPUX begins and grows as reflected Signals are absorbed.

The Field is where execution becomes situational.

---

## Field Intention Set And Field Pulse Set

A Field maintains two core collections:

```text
FIS = Field Intention Set
FPS = Field Pulse Set
```

The Field Intention Set records the Intentions that have been reflected into the CPUX situation.

The Field Pulse Set records the current Pulses, usually preserving the latest trivalent value for each Pulse phrase.

---

## Sample Anchor: Field Snapshot

After the Green Light IC reflects a movement result, the Field may hold a snapshot like:

```json
{
  "fis": [
    "I_reflect_movement_state"
  ],
  "fps": {
    "current light": {
      "phrase": "current light",
      "tv": "Y",
      "response": ["green"]
    },
    "movement allowed": {
      "phrase": "movement allowed",
      "tv": "Y",
      "response": ["true"]
    },
    "current position": {
      "phrase": "current position",
      "tv": "Y",
      "response": ["4"]
    }
  }
}
```

This is not a generic app store.

It is the represented situation that the Visitor can test on the next pass.

---

## Field As State

Traditional applications often treat state as values stored in components, stores, databases, sessions, or caches.

CPUX treats the Field as the represented state of a unit of work.

This state is not just technical. It is situational:

```text
What has been perceived?
Under what Intentions?
What has been reflected?
What is now stable enough for further action?
```

---

## Field And Visitor

The Visitor checks the Field to decide whether an Intention Container can activate.

It does not simply call the next function.

It asks whether the Field contains the required Intention and Pulse conditions for the next computation.

This is called synctest in the CPUX architecture.

---

## Field And Human Feedback

In frontend CPUX, the Field is not the only path of response.

A GridLookout Cell may receive the direct IC result immediately from O_reflector. The same reflected Signal is also absorbed into the Field through the pickup queue.

This gives the system both:

- immediate human-facing feedback
- ordered situational stabilisation

The Field preserves the wider CPUX reality after the human-facing result is reflected.

---

## Developer Rule

Do not think of the Field as a generic state bag.

Think of it as the represented situational reality of a CPUX unit of work.
