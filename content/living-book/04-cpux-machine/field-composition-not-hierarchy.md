---
title: Field Composition Not Hierarchy
order: 13
description: Why CPUX Fields compose through FieldBoard release and trigger rules rather than forming a strict hierarchy of nested Fields.
---

# Field Composition Not Hierarchy

A CPUX Field belongs to one CPUX instance.

When that Field releases a configured Signal, the FieldBoard may use that Signal to instantiate another CPUX and create another Field.

This creates **composition of Fields**, not strict hierarchy of Fields.

---

## Not Field Inside Field

The relationship is not:

```text
Field A contains Field B
```

That would imply a nested ownership model.

Instead, the relationship is:

```text
Field A releases Signal
        |
        v
FieldBoard trigger rule
        |
        v
new CPUX instance
        |
        v
Field B
```

Field A does not contain Field B.

The FieldBoard composes them through release and trigger rules.

---

## Why Composition Is Better

Composition keeps each CPUX Field clean.

Each Field remains the represented situational state of its own CPUX instance.

The FieldBoard becomes the coordination surface between Fields.

This supports:

- multiple active CPUX instances
- cross-App coordination
- independent Field lifecycles
- clearer release and trigger rules
- less confusion about nested ownership

---

## Release Signal

A Field may be configured to release certain Signals.

When such a Signal is reflected and absorbed, the Field can expose it to the FieldBoard.

The FieldBoard checks whether any trigger rule matches.

If a rule matches, the FieldBoard can create a new CPUX instance with a new Field.

---

## Composition Diagram

```text
CPUX_A
  Field_A
    |
    | releases I_user_authenticated
    v
FieldBoard
    |
    | trigger rule
    v
CPUX_B
  Field_B
```

The composition happens at the FieldBoard.

---

## Developer Rule

Avoid saying that one Field is inside another Field unless the implementation truly models containment.

Prefer:

```text
FieldBoard composes Fields through release and trigger Signals.
```

