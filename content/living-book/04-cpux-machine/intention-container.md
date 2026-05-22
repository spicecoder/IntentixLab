---
title: Intention Container
order: 3
description: The Intention Container as the smallest executable CPUX unit built from O_holder, Design Node, and O_reflector.
---

# Intention Container

An Intention Container is the smallest executable unit of CPUX.

It brackets a Design Node with two Objects:

```text
O_holder -> DN -> O_reflector
```

This structure keeps accumulation, computation, and reflection separate.

---

## The Three Roles

`O_holder`

The holder accumulates perceptions across activations. It gives the DN an enriched input Signal built from accumulated state.

`DN`

The Design Node performs explicit computation.

`O_reflector`

The reflector receives the DN result and reflects it outward as the IC result and pickup Signal.

---

## Why The Container Exists

The Intention Container prevents three concerns from collapsing into one hidden component.

It separates:

- memory of perception
- computation
- outward reflection

This makes CPUX easier to inspect, test, replay, and port across platforms.

---

## Activation

An IC can be activated in two major ways.

The Visitor can activate it after synctest against the Field.

A GridLookout Cell can directly invoke its receptor IC when the human acts.

Both paths use the same IC structure.

---

## Pickup

When O_reflector reflects the result, the IC reaches pickup.

At pickup, the reflected Signal becomes available to:

- the originating Cell as direct result
- subscribing GridLookout Cells
- the Field pickup queue

This keeps human feedback and system-level Field absorption independent.

---

## Developer Rule

Treat the IC as an atomic perceptive execution unit.

If a unit needs hidden local state, ask whether that state belongs in O_holder, the Field, or an explicit persistence record.

