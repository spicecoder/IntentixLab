---
title: Retained IC Context
order: 12
description: How O_holder retains perception inside an IC across act, commit, resume, and reset client action modes.
---

# Retained IC Context

An IC can retain context through O_holder.

This retained context is not the same as Field state.

O_holder preserves perception history inside the IC so the DN can receive an enriched Signal without keeping hidden internal state.

---

## Why Retention Exists

Human action often arrives across multiple steps.

Example:

```text
type username
type password
click submit
correct password
click submit again
```

The DN should not need to remember all of this internally.

O_holder can accumulate the relevant Pulses and construct the enriched input Signal when the DN runs.

---

## The Four Modes

O_holder facilitates four client action modes:

```text
act
commit
resume
reset
```

These modes are carried through:

```text
<"_perception_mode", Y, ["act"]>
```

The mode tells O_holder how to handle retained context before DN execution.

---

## Act

`act` appends the new perception.

```text
new Signal
    |
    v
append to O_holder
    |
    v
build enriched input
```

This is the everyday mode for typing, clicking, selecting, dragging, or otherwise expressing perception through GridLookout.

---

## Commit

`commit` affirms that accumulated perception is ready for final action.

O_holder can freeze or mark the accumulated context as committed before the DN processes it.

This mode is useful for actions like:

- submit application
- place order
- confirm payment
- accept recommendation
- finalise record

---

## Resume

`resume` rebuilds context from persistence.

This is useful when:

- a browser refreshes
- an Android Activity resumes
- an iOS app returns from background
- a user re-enters a flow
- a process restarts

O_holder replays retained perception so the DN can continue from represented context rather than from an empty state.

---

## Reset

`reset` clears accumulated perception.

This is not merely deletion. It is a represented human or system act:

```text
the current path is no longer relevant
```

Reset is useful for:

- cancel
- clear form
- restart flow
- abandon cart
- begin new measurement

---

## Retained Context Vs Field Context

O_holder context is local to the IC.

Field context is public to the CPUX Field after reflection.

```text
O_holder retains what the IC needs.
O_reflector exposes what the Field should know.
```

This separation lets the IC remember details without forcing every detail into the Field.

---

## Developer Rule

Use O_holder for perception history that a DN needs.

Use O_reflector when that history produces a result that should become part of the CPUX Field.

