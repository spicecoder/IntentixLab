---
title: Object Reflector Deep Dive
order: 10
description: A closer look at O_reflector as the reflect-only boundary that turns Design Node output into direct results, pickup events, and Field updates.
---

# Object Reflector Deep Dive

O_reflector is the outward boundary of an Intention Container.

It receives the Design Node's result Signal and reflects it into the CPUX world.

This makes O_reflector one of the most important parts of the human-facing runtime.

---

## Basic Role

O_reflector does not own the computation.

The DN computes.

O_reflector reflects.

```text
DN result Signal
      |
      v
O_reflector
      |
      v
reflected Signal
```

That reflected Signal becomes the visible contribution of the IC.

---

## Designated Absorbed Signal

O_reflector should know what Signal it is designated to absorb.

This is often called the **DAS**:

```text
Designated Absorbed Signal
```

The DAS lets O_reflector check whether the DN emitted the expected kind of result.

Example:

```text
DAS:
  Intention: I_login_result_internal
  Pulses:
    credentials valid
    login message
```

This keeps the DN/O_reflector boundary explicit.

---

## Reflected Signal

After accepting the DN result, O_reflector emits the configured reflected Signal.

Example:

```text
reflected Intention:
  I_reflect_login_result
```

The reflected Signal is what the rest of CPUX sees.

It may be delivered to:

- the originating GridLookout Cell as direct result
- subscribing Cells as update
- the Field pickup queue for absorption
- an enclosing FieldBoard as a release candidate

---

## Designer Power Without DN Change

O_reflector gives the designer an important kind of power.

The designer can configure how a DN result enters the CPUX Field without changing the DN itself.

This matters because the DN is treated as a black box from the CPUX design perspective.

The DN may be written in JavaScript, Kotlin, Go, Rust, Python, WASM, or an AI model. The designer does not need to edit its internal implementation in order to decide how its result should participate in the wider Field.

Instead, the designer configures O_reflector:

```text
DN emits result Signal
        |
        v
O_reflector maps it to reflected Intention
        |
        v
Field receives configured contribution
```

This means the same DN can participate in different CPUX designs by changing its surrounding reflection configuration.

---

## Field Configuration Through Reflection

The Field does not absorb arbitrary DN internals.

The Field absorbs reflected Signals.

That gives the designer a precise place to decide:

- which DN result is accepted
- what reflected Intention is emitted
- which Pulses become visible to the Field
- which Cells may subscribe to the result
- whether the reflected Signal can release to an enclosing FieldBoard

The designer configures the Field's future by configuring reflection.

This is a major difference from traditional software, where changing how a computation affects application state often requires changing the computation itself.

---

## The Single Pickup Moment

O_reflector creates the IC pickup moment.

Pickup should be treated as a single broadcast point with multiple independent consumers:

```text
O_reflector reflected Signal
        |
        v
     ic:pickup
        |
   +----+----------------+
   |                     |
   v                     v
Field queue        GridLookout subscribers
```

For direct UI invocation, the caller also receives the direct result from the same reflected Signal.

---

## Reflect-Only Discipline

O_reflector should not become a hidden processor.

It may:

- check designated Signal match
- reflect under a configured Intention
- apply declarative RTM where allowed
- persist reflection records
- emit pickup

It should not:

- perform hidden validation
- derive business values
- call external services
- secretly rewrite human input
- decide new application meaning outside configuration

Those responsibilities belong to a Design Node.

---

## O_reflector And Human Perception

In frontend CPUX, O_reflector is the path by which the human sees the result of action.

The human acts through GridLookout.

The receptor IC runs.

O_reflector reflects the result.

The originating Cell receives that result directly.

This is why O_reflector must remain clear and disciplined. It stands between explicit computation and human perception.

---

## O_reflector And Field Stability

The Field does not absorb DN output directly.

It absorbs reflected Signals.

That means O_reflector controls what becomes part of the CPUX situational state.

The Field stabilises through reflected results, not through arbitrary internal computation.

---

## Developer Rule

When designing O_reflector, ask:

```text
What DN result is this reflector allowed to absorb?
What reflected Intention should it emit?
Who consumes the reflected Signal?
What persistence record should prove this reflection happened?
```

If O_reflector starts answering business questions, move that logic back into a Design Node.
