---
title: Object
order: 7
description: Object as a reflect-only participant that carries, persists, and releases Signals without hidden computation.
---

# Object

An Object in Intention Space reflects Signals.

It is not a traditional object in the object-oriented programming sense. It is a runtime participant that carries, persists, and reflects communication without hiding arbitrary computation.

---

## Reflect, Do Not Compute Secretly

The Object rule is strict:

> Objects should reflect, persist, route, or declaratively transform Signals, but they should not secretly derive new business values.

This protects the visibility of computation.

If a value must be created, calculated, validated, inferred, or transformed through logic, that work belongs in a Design Node.

---

## Why Objects Matter

Objects make Signal movement manageable.

They can:

- receive a designated absorbed Signal
- check whether the incoming Signal matches
- apply declared reflection rules
- persist what was received or reflected
- release a reflected Signal
- support replay and compensation

This creates a more accountable runtime than anonymous event passing.

---

## O_holder

In an Intention Container, O_holder is the accumulator.

It preserves perception history across activations.

```text
human action 1
human action 2
human action 3
        |
        v
O_holder accumulated state
```

O_holder does not compute the meaning of the history. It makes the history available to the Design Node.

---

## O_reflector

O_reflector receives the Design Node result and reflects it outward.

It is the outward-facing boundary of the Intention Container.

In frontend CPUX, the O_reflector result is especially important because the originating GridLookout Cell can receive it directly before wider Field propagation completes.

---

## Developer Rule

If an Object begins to contain hidden logic, stop and ask:

```text
Should this be a Design Node instead?
```

Objects preserve the clarity of CPUX by refusing to become secret processors.

