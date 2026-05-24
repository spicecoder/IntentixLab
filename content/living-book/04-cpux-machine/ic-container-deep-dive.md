---
title: IC Container Deep Dive
order: 9
description: A closer look at the Intention Container as the executable cell of CPUX, joining accumulation, computation, and reflection.
---

# IC Container Deep Dive

The Intention Container, often shortened to **IC**, is the executable cell of CPUX.

It is the smallest place where CPUX can say:

```text
perception has arrived
context has been accumulated
computation can run
the result can be reflected
```

The IC gives CPUX a repeatable unit of stabilisation.

---

## Basic Shape

The standard IC shape is:

```text
O_holder -> DN -> O_reflector
```

More fully:

```text
incoming Signal
      |
      v
  O_holder
      |
      v
 enriched Signal
      |
      v
      DN
      |
      v
 result Signal
      |
      v
 O_reflector
      |
      v
 reflected Signal
```

Each part has a different responsibility.

---

## Responsibilities Inside The IC

O_holder accumulates perception and facilitates the four client action modes:

```text
act | commit | resume | reset
```

The DN performs explicit computation as a black box.

O_reflector validates the DN's emitted Signal against the designated output expectation before reflecting it outward.

This gives the IC a clear inner contract:

```text
O_holder    -> prepare accumulated context
DN          -> compute
O_reflector -> validate and reflect
```

---

## The IC Does Not Hide The Path

In traditional application code, the equivalent work may be hidden across:

- event handlers
- component state
- service calls
- validation helpers
- callbacks
- store mutations
- UI updates

The IC makes the path explicit.

It says:

```text
accumulation belongs here
computation belongs here
reflection belongs here
```

This is why the IC is central to CPUX.

---

## Two Ways To Activate An IC

An IC may be activated by the Visitor.

```text
Field -> synctest -> Visitor -> IC activation
```

An IC may also be activated directly by a GridLookout Cell.

```text
human action -> Cell -> receptor IC activation
```

These two paths meet at the same container.

This is important because CPUX does not need one architecture for backend causality and another architecture for frontend interaction. The IC remains the common executable unit.

---

## IC State

An IC should have clear lifecycle states.

Example working vocabulary:

```text
Ready
Activating
Pickup
Confirmed
Stopped
Error
```

The exact implementation may vary, but the conceptual movement is:

```text
Ready -> Activating -> Pickup -> Ready
```

or, for a run-once IC:

```text
Ready -> Activating -> Pickup -> Stopped
```

Pickup is especially important because it is the moment where O_reflector has produced the reflected Signal.

---

## IC And Direct Result

When a GridLookout Cell directly invokes a receptor IC, the IC returns the O_reflector result directly to the calling Cell.

This is not a shortcut around CPUX.

It is the human-facing path through CPUX.

The same reflected Signal is still broadcast as pickup for Field absorption and subscriber updates.

---

## IC And Stabilising Intelligence

An IC contributes to stabilisation by making one small part of the situation explicit.

O_holder remembers relevant perception.

The DN computes under a declared input Signal.

O_reflector emits a declared reflected Signal.

Before reflection, O_reflector checks that the emitted Signal is valid for the configured IC boundary.

The Field absorbs the result.

The Visitor tests whether the larger CPUX situation can continue.

In this way, the IC is not merely a technical wrapper. It is a stabilisation unit.

---

## Developer Rule

When designing an IC, ask:

```text
What perception should this IC accumulate?
What computation should its DN perform?
What reflected Signal should become visible afterward?
```

If those three answers are not clear, the IC boundary probably needs revision.
