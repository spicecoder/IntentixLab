---
title: CPUX Machine
order: 1
description: CPUX as the runtime machine that turns Intention Space vocabulary into a Common Path of Understanding and Execution.
---

# CPUX Machine

CPUX means **Common Path of Understanding and Execution**.

It is the runtime form of Intention Space.

Where the earlier chapters define Pulse, Signal, Intention, Object, Design Node, and Field, this section explains how those concepts move together as a working machine.

---

## The Core Movement

A CPUX begins when a Signal triggers a configured path.

That path is made of Intention Containers.

Each Intention Container brackets a Design Node with Objects:

```text
O_holder -> DN -> O_reflector
```

As the CPUX runs, reflected Signals are absorbed into a Field. The Field becomes the represented situational state of that unit of work.

---

## Why CPUX Is Not A Workflow Engine

CPUX may look like a workflow engine at first, but the intention is different.

A workflow engine usually asks:

```text
What step comes next?
```

CPUX asks:

```text
What situation has stabilised enough for the next Design Node to act?
```

That shift matters.

CPUX is not only sequencing execution. It is accumulating and testing represented situational reality.

---

## The Main Runtime Parts

The CPUX machine has several cooperating parts:

- **CPUX definition**: the configured path of Intention Containers
- **Intention Container**: the smallest executable CPUX unit
- **O_holder**: the perception-history accumulator
- **Design Node**: the explicit computation unit
- **O_reflector**: the outward reflection boundary
- **Field**: the evolving situational state of the CPUX
- **FieldBoard**: the per-user container of active CPUX Fields
- **Visitor**: the executor that tests the Field and activates eligible containers
- **GridLookout**: the native UI surface that can directly invoke receptor ICs

Together, these parts let computation proceed through represented perception and intention instead of hidden event chains.

---

## Follow The Machine

The CPUX overview should be read alongside the chapters that explain its executable core:

- [Visitor And Synctest](/living-book/04-cpux-machine/visitor-and-synctest.html) explains how the Visitor reads the Field, tests designated input, reaches golden pass, and expresses runtime stability.
- [IC Container Deep Dive](/living-book/04-cpux-machine/ic-container-deep-dive.html) explains the Intention Container as the executable CPUX cell.
- [Object Reflector Deep Dive](/living-book/04-cpux-machine/object-reflector-deep-dive.html) explains how O_reflector turns DN output into direct result, pickup event, subscriber update, and Field absorption.

These chapters are where CPUX moves from vocabulary into runtime behaviour.

---

## Backend And Frontend Modes

The same CPUX idea can run in different environments.

In backend mode, the Visitor can run synchronously until no more containers are eligible.

In frontend mode, the Visitor may sleep at the golden pass and wake again when human action changes the Field.

This gives CPUX a single conceptual machine with different runtime policies:

```text
backend:  run -> stabilise -> terminate
frontend: run -> stabilise -> sleep -> wake on human action
```

---

## The Human Loop

Frontend CPUX includes a special requirement:

> the originating UI Cell must receive the direct IC result without waiting for Field absorption or the Visitor's next pass.

This preserves immediate human perception.

The same reflected Signal still goes to the Field and subscribers. CPUX therefore supports both:

- immediate human-facing feedback
- ordered system-level stabilisation

This dual path is one of the most important ideas in the CPUX machine.
