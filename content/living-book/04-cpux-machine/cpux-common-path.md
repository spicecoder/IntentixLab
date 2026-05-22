---
title: CPUX As Common Path
order: 2
description: CPUX as a Common Path of Understanding and Execution rather than a hidden sequence of function calls.
---

# CPUX As Common Path

CPUX stands for **Common Path of Understanding and Execution**.

The phrase matters.

It does not say only execution path. It says understanding and execution.

This means a CPUX should carry enough represented perception and intention for the path of action to be understood, not merely performed.

---

## A Unit Of Work

A CPUX represents a logical unit of work.

Examples:

- login
- cart update
- profile edit
- payment confirmation
- document submission
- AI-assisted decision
- sensor interpretation

Each unit of work may involve several interactions between human, UI, Design Nodes, Objects, and Field.

The CPUX gives those interactions a shared path.

---

## Not Just A Procedure

A traditional procedure might look like this:

```text
step 1 -> step 2 -> step 3 -> done
```

A CPUX path is more situational:

```text
trigger Signal
-> Field created
-> ICs become eligible as Signals are reflected
-> Visitor tests the Field
-> human actions may directly invoke receptor ICs
-> Field stabilises
-> release Signal may trigger further CPUX paths
```

The CPUX is therefore not only an ordered list. It is an executable field of possible stabilisation.

---

## Trigger Signal

A CPUX begins from a trigger Signal.

The trigger Signal establishes that a particular path of understanding and execution should be instantiated.

For example:

```text
I_start_login
```

may trigger:

```text
CPUX_login
```

The trigger should be unique enough that the FieldBoard can decide which CPUX definition to instantiate.

---

## Release Signal

A CPUX may release a Signal outward.

That release can be absorbed by an enclosing Field or FieldBoard. It may also trigger another CPUX if configured to do so.

This allows paths to compose without direct DN-to-DN coupling.

---

## Developer Rule

When defining a CPUX, do not begin with code order.

Begin with the unit of understanding:

```text
What situation is this CPUX meant to stabilise?
What Signal starts it?
What reflected Signal completes or releases it?
```

