---
title: Glossary First Pass
order: 3
description: "A first-pass glossary for the living book vocabulary: Pulse, Signal, Intention, Design Node, Object, Field, CPUX, GridLookout, and Stabilising Intelligence."
---

# Glossary First Pass

This glossary is intentionally preliminary. The terms will become more precise as the book matures through examples and reference chapters.

---

## Pulse

A Pulse is a represented perception.

It has a phrase, a trivalent status, and an optional response area:

```text
Pulse := <phrase, TV, Response>
```

The phrase gives semantic identity. The trivalent value gives perceptual status. The response carries associated values.

---

## Trivalence

Trivalence is the three-valued perceptual status of a Pulse:

```text
Y | N | UN
```

It should not be reduced too quickly to ordinary boolean logic. In CPUX, trivalence helps express whether a perception is affirmed, negated, or still unresolved within a situation.

---

## Response

The Response is the value-bearing part of a Pulse.

It may be treated as an array so that perception history can be accumulated. In O_holder, response arrays can grow across successive activations, preserving the order of human or system contributions.

---

## Intention

An Intention is a semantic communication context.

It is not merely a task name or function name. It establishes how a Pulse set should be interpreted when carried through a Signal.

---

## Signal

A Signal combines an Intention with a set of Pulses:

```text
Signal := <Intention, PulseSet>
```

Signals are identified communication. They make runtime movement traceable.

---

## Object

An Object reflects Signals.

In CPUX, Objects should not hide arbitrary computation. Their role is to carry, persist, reflect, and sometimes declaratively transform Signals according to explicit configuration.

---

## Design Node

A Design Node is an independently executable unit of computation.

It absorbs a Signal, performs computation, and emits a Signal:

```text
execute(inputSignal) -> resultSignal
```

A human can also be understood as a Design Node in the wider perceptual loop: perceiving a situation, deciding, and acting.

---

## Intention Container

An Intention Container brackets a Design Node with two Objects:

```text
O_holder -> DN -> O_reflector
```

O_holder accumulates perception history. O_reflector emits the result outward as a reflected Signal.

---

## CPUX

CPUX means Common Path of Understanding and Execution.

It is a sequence of Intention Containers forming a unit of work. CPUX is not only a path of execution. It is a path through which situational understanding becomes stable enough for action.

---

## Field

A Field is the evolving state of a CPUX.

It accumulates reflected Intentions and Pulses as execution progresses. In a Perceptive App, the Field is the represented situational state of a unit of work.

---

## FieldBoard

A FieldBoard manages active CPUX Fields for a user session.

It receives released Signals, checks trigger rules, and may start additional CPUX instances.

---

## Visitor

The Visitor walks the CPUX sequence.

It checks whether each Intention Container can activate by testing the Field against that container's designated input conditions.

---

## GridLookout

GridLookout is the cross-platform UI contract for Perceptive Apps.

It binds Cells to Pulses, sends human actions as Signals, receives direct IC results, and listens for subscription updates.

ReactJS and Android demonstrations come first. Native GridLookout surfaces can mature across iOS, Flutter, desktop, and embedded platforms.

---

## Stabilising Intelligence

Stabilising Intelligence is the ability of a system to discover, maintain, and evolve coherent situational structures under interaction and perturbation.

For CPUX, this gives the runtime a wider purpose: preserving coherent situational reality across human perception, machine computation, and cross-platform execution.
