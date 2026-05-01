---
title: "CPUX in Intention Space"
section: "Architecture"
order: 30
---

# CPUX in Intention Space

A **CPUX** is the *Common Path of Understanding and Execution* in Intention Space. It is the runtime path through which an application moves from one perceived situation to the next.

Where a **Design Node** is an independently executable unit, a CPUX explains how many such units participate in a meaningful application flow. A login flow, a shopping cart flow, a checkout flow, a profile update flow, or a learning exercise can each be represented as a CPUX.

In ordinary software, these flows are usually hidden across event handlers, API calls, database updates, UI state, and background processes. In Intention Space, the flow is made explicit as a sequence of **Intention Containers**.

```text
CPUX = IC1 → IC2 → IC3 → ...
```

Each **Intention Container** has the form:

```text
O_holder → DN → O_reflector
```

The container receives an incoming **Signal**, lets the holder Object accumulate the perception, lets the Design Node compute, and lets the reflector Object certify and release the result.

---

## Why CPUX Exists

A single Design Node can compute a result, but an application is rarely a single computation.

An application is usually a chain of perceptual steps:

```text
show something → user acts → system responds → another condition becomes true → next unit runs
```

CPUX gives this chain a visible runtime structure.

It answers questions such as:

- Which Signal starts this flow?
- Which Design Node is allowed to run next?
- Which Pulses are now present in the runtime Field?
- Which result is certified and released?
- When is the flow complete?
- When should the flow sleep and wait for the user?

This is why CPUX is central to Perceptive Apps. It turns application behavior into an explicit, inspectable path of Signals, Pulses, Objects, and Design Nodes.

---

## A Runtime CPUX Belongs to One User

A CPUX definition is reusable. But at runtime, each CPUX instance is bound to a particular user interaction context.

For example, the same shopping cart CPUX definition may be used by many users:

```text
shopping_cart_cpux_definition
```

But at runtime there are separate CPUX instances:

```text
CPUX_cart_user_A
CPUX_cart_user_B
CPUX_cart_user_C
```

Each instance has its own **Field**.

The Field is the live state of that CPUX instance. It contains:

```text
FIS = Field Intention Set
FPS = Field Pulse Set
```

So user A's cart Pulses do not mix with user B's cart Pulses. The CPUX definition is shared, but the Field is user-bound and runtime-specific.

---

## Any App as a Collection of CPUX Instances

A Perceptive App is not treated as one large hidden program. It is treated as a collection of CPUX flows.

For example:

```text
App: Shopping System

CPUX_login
CPUX_cart
CPUX_checkout
CPUX_payment
CPUX_order_confirmation
CPUX_error_recovery
```

Each CPUX handles one coherent unit of work. Some CPUX instances may run once and terminate. Others may sleep after reaching Golden Pass and wake again when the user acts.

This makes application structure easier to inspect:

```text
Application = collection of CPUX definitions
Runtime App = collection of user-bound CPUX instances and their Fields
```

The important shift is this:

```text
An app is not just screens plus code.
An app is a set of perceptual execution paths.
```

---

## The Visitor Loop

Inside a CPUX, the **Visitor** walks through the Intention Containers in sequence.

At each container, it asks:

```text
Is this IC ready?
Does the Field contain the IC's designated input Signal?
```

This test is called **Synctest**.

A Synctest passes when:

```text
required intention ∈ FIS
required pulses ⊆ FPS
```

If the Synctest passes, the Visitor activates the IC. The IC runs its holder, Design Node, and reflector sequence. The result appears as a **Pickup**.

---

## Pickup: The Certified Handover Point

A Design Node does not write directly into the Field.

Instead:

```text
DN emits candidate Signal
O_reflector absorbs it
O_reflector checks it against the designer-assigned output Signal
valid result → Pickup → Field absorption
invalid result → error Signal → FieldBoard action
```

Pickup is therefore not just a temporary buffer. It is the certified handover point between computation and Field state.

This matters because a DN is a black box. It may produce an unexpected Signal. The reflector Object protects the Field from being contaminated by a wrong result.

So the rule is:

```text
Only certified reflected Signals enter the Field.
```

This is one of the strongest runtime safety ideas in CPUX.

---

## Golden Pass

The Visitor continues making passes through the CPUX sequence.

When no IC starts and no IC is busy, the Visitor marks a pre-golden condition. If the next pass also has no work, the CPUX reaches **Golden Pass**.

In backend mode:

```text
Golden Pass → terminate
```

In frontend mode:

```text
Golden Pass → sleep
user action or Field change → wake
```

This is why frontend CPUX can remain interactive without continuously running. It sleeps when no causality is pending and wakes when new perception arrives.

---

## Direct Signals from UI

A user action does not need to wait for the Visitor.

A GridLookout cell may send a Signal directly to its receptor Intention Container:

```text
Cell action → Signal → receptor IC
```

This direct path bypasses Synctest because the user's perception is the authority for that action.

The direct path gives immediate response. The Visitor path preserves ordered cross-IC causality.

Both paths are needed:

```text
Direct UI path = immediate human response
Visitor path   = ordered application causality
```

---

## Why CPUX Is Difficult but Important

CPUX is subtle because it combines several ideas that ordinary software usually hides:

- explicit Signals instead of anonymous function calls
- Fields instead of scattered state variables
- Objects as reflectors and certifiers
- Design Nodes as stateless black boxes
- Pickup as a handover boundary
- Golden Pass as completion or sleep
- direct UI Signals as perception-driven entry

Once these ideas are understood, CPUX becomes a practical way to build both frontend and backend systems with the same computational discipline.

---

## CPUX Engine Tutorial Series

The CPUX tutorial series teaches the engine from the inside out:

```text
Lab 1 — One Intention Container
Lab 2 — Field and Visitor
Lab 3 — Synctest and extraction
Lab 4 — Pickup, reflector certification, and error release
Lab 5 — Golden Pass
Lab 6 — Direct UI Signals
Lab 7 — Full frontend CPUX with sleeping Visitor
Lab 8 — Backend CPUX and release-triggered flows
```

The goal is not only to understand CPUX conceptually, but to read CPUX traces and eventually implement a small CPUX runner.

A student has mastered CPUX when they can explain this sentence:

```text
DN computes; O_reflector certifies; Pickup hands over; Field absorbs; Visitor preserves causality; Golden Pass proves there is no pending work.
```

That is the operational heart of Intention Space.
