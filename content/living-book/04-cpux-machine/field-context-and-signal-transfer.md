---
title: Field Context And Signal Transfer
order: 11
description: How context moves through Signals, becomes reflected by ICs, and is absorbed into a CPUX Field as situational state.
---

# Field Context And Signal Transfer

The CPUX Field is where reflected context becomes situational state.

A Signal carries context into an Intention Container. O_holder may retain context inside the IC. The DN computes from enriched context. O_reflector reflects the result outward. The Field absorbs that reflected Signal.

This movement is the context path of CPUX.

---

## Context Enters Through Signal

A Signal is not only a packet of values.

It carries a Pulse set under an Intention:

```text
Signal := <Intention, PulseSet>
```

That means context enters CPUX as represented perception:

```text
Intention: I_change_light
Pulses:
  <"current light", Y, ["green"]>
  <"_perception_mode", Y, ["act"]>
```

The Intention gives the Pulse set its communication stance. The Pulses carry the represented situation.

---

## Context Inside The IC

When the Signal reaches an IC, O_holder may accumulate it.

```text
incoming Signal
      |
      v
O_holder accumulation
      |
      v
enriched Signal to DN
```

The DN receives not only the newest action, but the relevant accumulated perception history.

This allows the DN to remain stateless while still acting with context.

---

## Context Leaves Through Reflection

The DN emits a result Signal.

O_reflector validates that emitted Signal against the designated output expectation and reflects it outward.

```text
DN result
    |
    v
O_reflector validation
    |
    v
reflected Signal
```

Only the reflected Signal becomes the IC's contribution to the wider CPUX situation.

---

## Field Absorption

The Field absorbs reflected Signals.

It updates:

```text
FIS = Field Intention Set
FPS = Field Pulse Set
```

The current working rule is:

```text
latest TV wins for the same Pulse phrase
```

This means the Field carries the latest represented situational state for the CPUX.

---

## Context Boundary

The boundary is important:

```text
O_holder context = retained inside IC
Field context    = reflected into CPUX situation
```

Not everything retained by O_holder automatically enters the Field.

The Field receives what O_reflector reflects.

This distinction keeps private accumulation and public CPUX state separate.

---

## Context Diagram

```text
GridLookout Cell / Visitor
          |
          v
       Signal
          |
          v
      O_holder
  retained context
          |
          v
    enriched Signal
          |
          v
          DN
          |
          v
    emitted Signal
          |
          v
     O_reflector
 validation + reflection
          |
          v
   reflected Signal
          |
          v
        Field
  FIS + FPS update
```

---

## Developer Rule

When designing a CPUX, ask:

```text
What context should travel in the Signal?
What context should O_holder retain?
What context should O_reflector expose to the Field?
```

Those three answers define the context boundary of the IC.

