---
title: Intention Space
order: 1
description: "The core vocabulary of Intention Space: Pulse, Trivalence, Response, Signal, Intention, Object, Design Node, and Field."
---

# Intention Space

Intention Space is the representational ground of CPUX.

It gives developers a vocabulary for making perception, intention, communication, execution, and situational state visible inside software.

Without this vocabulary, CPUX can look like an unusual runtime pattern. With it, CPUX becomes easier to understand as a model of human-centred computation.

---

## The Problem It Solves

Traditional software often hides meaning inside code:

```text
event handler
-> function call
-> state mutation
-> UI update
```

The application may work, but the path of understanding is usually not represented as a first-class structure.

Intention Space asks developers to make that path explicit:

```text
perception
-> Pulse
-> Signal
-> Intention
-> Design Node
-> reflected Signal
-> Field
```

The goal is not to make programs verbose. The goal is to make intention inspectable.

---

## The Smallest Unit

The smallest unit is the **Pulse**.

A Pulse represents a perception in context:

```text
Pulse := <phrase, TV, Response>
```

From this small unit, the rest of the model grows.

A Pulse becomes part of a Signal. A Signal travels under an Intention. A Design Node absorbs and emits Signals. Objects reflect Signals. Fields accumulate reflected Signals into a situational state.

---

## The Core Terms

Phase 2 introduces the terms that every developer needs before entering CPUX mechanics:

- Pulse
- Trivalence
- Response Array
- Signal
- Intention
- Object
- Design Node
- Field

These are not merely names for framework classes. They are conceptual commitments.

Each one helps preserve the human loop of perception, intention, action, and stabilisation.

---

## A First Runtime Picture

At runtime, Intention Space can be imagined like this:

```text
Human or system perception
        |
        v
      Pulse
        |
        v
Signal = Intention + PulseSet
        |
        v
Design Node / Object / Field
        |
        v
Reflected situational change
```

This is the foundation upon which CPUX builds a Common Path of Understanding and Execution.
