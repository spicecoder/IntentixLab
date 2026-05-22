---
title: O_holder And O_reflector
order: 4
description: "The two Object roles inside an Intention Container: accumulation through O_holder and outward reflection through O_reflector."
---

# O_holder And O_reflector

Every non-trivial Intention Container has two Object roles.

They share the Object discipline, but they do different work.

```text
O_holder    = accumulator
O_reflector = emitter
```

---

## O_holder

O_holder preserves perception history.

When a human or system sends repeated Signals into an IC, O_holder can accumulate the relevant Pulses so the DN receives an enriched context.

Example:

```text
username entered
password entered
submit clicked
```

The DN should not need to hold this hidden state internally. O_holder makes the accumulated context explicit.

---

## Perception Modes

O_holder responds to the distinguished Pulse:

```text
_perception_mode
```

Common modes:

```text
act
resume
reset
commit
```

These modes let the same IC handle normal action, re-entry after interruption, purging of accumulated perception, and final commitment.

---

## O_reflector

O_reflector receives the DN result and reflects it outward.

It checks that the DN output matches the designated absorbed Signal and then emits the configured reflected Signal.

O_reflector is the outward boundary of the IC.

---

## Why Two Objects

The separation matters.

O_holder accumulates and does not reset on every pickup.

O_reflector emits and usually resets after pickup confirmation.

Combining them too early would blur perception history and outward release.

---

## Developer Rule

Use O_holder for accumulated perception.

Use O_reflector for reflected result.

Do not ask either Object to perform hidden computation that belongs in a Design Node.
