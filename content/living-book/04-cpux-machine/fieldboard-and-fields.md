---
title: FieldBoard And Fields
order: 5
description: FieldBoard as the per-user container of active CPUX Fields, and Field as represented situational state.
---

# FieldBoard And Fields

A CPUX does not run in empty space.

It runs inside a FieldBoard.

The FieldBoard manages active CPUX Fields for a user or session.

---

## FieldBoard

The FieldBoard is the container of active CPUX reality.

It can:

- instantiate a CPUX from a trigger Signal
- create the CPUX Field
- maintain active Fields
- receive released Signals
- check trigger rules
- start additional CPUX instances

For a developer, the FieldBoard is where separate units of work become coordinated.

---

## Field

A Field belongs to a CPUX instance.

It maintains:

```text
FIS = Field Intention Set
FPS = Field Pulse Set
```

The Field is the represented situational state of that unit of work.

---

## Absorption

When an IC reaches pickup, its reflected Signal is absorbed by the Field.

The Field adds the Intention to FIS and updates FPS with the reflected Pulses.

The current working rule is:

```text
latest TV wins for the same Pulse phrase
```

This lets the Field hold the latest represented situation.

---

## Field Hierarchy

A Field may release Signals outward.

The enclosing FieldBoard can check whether that released Signal triggers another CPUX.

This allows CPUX paths to compose without direct procedural coupling.

---

## Developer Rule

Think of a Field as represented situational state, not a generic store.

Think of FieldBoard as the place where CPUX situations are instantiated, related, and released.

