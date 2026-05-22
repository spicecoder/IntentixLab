---
title: Visitor And Synctest
order: 6
description: The Visitor as the CPUX executor that tests Field conditions and activates eligible Intention Containers.
---

# Visitor And Synctest

The Visitor is the CPUX executor.

It walks the configured Intention Containers and checks whether each one is eligible to activate.

That eligibility test is called **synctest**.

---

## The Visitor Question

The Visitor does not simply ask:

```text
What is the next function?
```

It asks:

```text
Does the Field contain the required situation for this IC to act?
```

That question is what makes CPUX different from ordinary step sequencing.

---

## Synctest

Synctest compares an IC's designated input Signal requirements against the current Field.

It checks whether:

- the required Intention is present in FIS
- the required Pulse phrases and TV values are present in FPS
- the IC is ready
- extraction mode allows activation

If the test passes, the Visitor can activate the IC.

---

## Designated Input Is A Designer Statement

The designer specifies an IC's designated input.

This is not the same as writing a hard-coded condition such as:

```text
light = blue
```

That traditional condition fixes the computation to a particular concrete state.

The Pulse approach allows the designer to work at a more perceptive and semantic level.

For example, the designer can define an IC that responds to:

```text
Intention: change light
Pulse:     current light
```

The important condition is not that the light is already blue, red, or green. The important condition is that the Field carries a represented perception of the current light under an Intention where changing the light is meaningful.

This allows the same IC to act on the light no matter what the current light value is.

---

## Meta-Level Synctest

In ordinary code, a developer may write:

```text
if light == "blue":
    changeLight()
```

That is value-level control.

In CPUX, the designer can define:

```text
required Intention: I_change_light
required Pulse:     current light
```

Then the DN receives the actual response value:

```text
<"current light", Y, ["blue"]>
```

or:

```text
<"current light", Y, ["red"]>
```

or:

```text
<"current light", Y, ["green"]>
```

The IC is eligible because the situation contains the right kind of perception, not because the current value equals one specific colour.

The DN can then decide how to compute the next light state.

This is one of the strengths of Pulse-based design: it separates situational eligibility from internal value transformation.

---

## Field And Visitor Relationship

The Field is the represented situational state.

The Visitor is the active reader of that state.

```text
                 reflected Signal
                       |
                       v
              +------------------+
              |      Field       |
              |                  |
              |  FIS: Intentions |
              |  FPS: Pulses     |
              +---------+--------+
                        |
                        | synctest reads
                        v
              +------------------+
              |     Visitor      |
              |                  |
              | checks IC inputs |
              +---------+--------+
                        |
          eligible IC?  |
              yes       v
              +------------------+
              | Intention        |
              | Container        |
              |                  |
              | O_holder -> DN   |
              |        -> O_ref  |
              +---------+--------+
                        |
                        | ic:pickup
                        v
                 reflected Signal
```

The Visitor does not own the state. It reads the Field and activates containers whose designated input conditions have become true.

The Field does not execute the CPUX. It accumulates reflected Signals and gives the Visitor a stable situation to test.

---

## A Visitor Pass

One Visitor pass can be understood as a scan across the CPUX sequence.

```text
Pass starts
   |
   v
+--------+     synctest      +---------+
|  IC 1  |  -------------->  | pass?   |
+--------+                  +----+----+
                                |
                    yes --------+-------- no
                     |                   |
                     v                   v
              activate IC 1          check IC 2
                     |
                     v
              pickup reflected
                  Signal
                     |
                     v
              Field absorbs
                     |
                     v
              continue scan
```

Because an IC activation can change the Field, a later IC in the same pass may become eligible after an earlier IC reflects its result.

---

## Default Loop Rule

By default, the Visitor runs as a loop.

After each pass, it retraces the CPUX path from the start.

This is important because a reflected Signal from a later IC may change the Field in a way that makes an earlier IC eligible again.

```text
Pass 1:
  IC1 -> IC2 -> IC3

Field changes

Pass 2:
  IC1 -> IC2 -> IC3

Field changes

Pass 3:
  IC1 -> IC2 -> IC3
```

The Visitor does not assume that forward position alone determines readiness. It returns to the beginning and tests the Field again.

---

## Golden Pass Definition

Golden pass is reached when the Visitor observes stability across consecutive passes.

The working rule is:

```text
1. The last pass did not find or start any IC/DN executing state.
2. The consecutive pass also did not start any DN.
3. Therefore no further autonomous execution is available.
4. Golden pass is declared.
```

In shorter form:

```text
no execution started in pass N
and
no execution started in pass N + 1
= golden pass
```

The consecutive-pass requirement protects against declaring stability too early while pickup processing, Field absorption, or async activation may still be settling.

---

## Golden Pass

The golden pass happens when the Visitor completes a scan and no IC can be activated.

```text
Visitor scans all ICs
        |
        v
Any IC activated?
        |
   +----+----+
   |         |
  yes        no
   |         |
   v         v
new Field   golden pass
state       reached
   |
   v
scan again
```

The meaning of golden pass depends on runtime mode.

---

## Golden Pass As Stability

Golden pass is more than an execution condition.

It is a small runtime sign of **Stabilising Intelligence**.

The CPUX has reached a point where, given the current Field, no further autonomous IC activation is meaningful. The represented situation has become stable enough to pause or terminate.

```text
Field state
   |
   v
Visitor scan
   |
   v
No eligible IC
   |
   v
stable enough
```

This does not mean the whole human situation is finished forever. It means the current CPUX Field has no unresolved executable movement under its present conditions.

In backend mode, this may mean completion.

In frontend mode, this may mean waiting for the next human perception.

---

## When Stability Is Not Reached

If a CPUX never reaches golden pass, the system may be failing to stabilise.

In ordinary programming language, this resembles an infinite loop.

In CPUX language, the problem is more specific:

```text
the Field keeps producing eligibility
without reaching a stable situation
```

This can happen when an IC repeatedly emits a Signal that immediately makes itself or another IC eligible again, without any changing condition that can eventually stop the cycle.

The problem is not repetition itself.

The problem is repetition without stabilisation.

---

## Repetition Can Be Intentional

A single IC may legitimately decide that it should be repeated in the next Visitor cycle.

For example, an IC may emit a reflected Signal that says:

```text
continue = Y
```

The Field absorbs that Signal. On the next pass, synctest may make the same IC eligible again.

Later, the IC may emit:

```text
continue = N
```

Now the same path no longer repeats, and the Visitor can eventually reach golden pass.

This is not an accidental infinite loop. It is controlled repetition through represented Field state.

---

## Green Light And Red Light

A simple developer demonstration could show this with a green light / red light sequence.

```text
Field:
  light = green

Visitor:
  IC_move is eligible

IC_move:
  emits "position advanced"
  emits "light check required"

Next pass:
  if light remains green -> IC_move repeats
  if light becomes red   -> IC_move stops

Golden pass:
  no IC can move under red light
```

In JavaScript, this could become a small visual demo:

```text
green light -> Visitor keeps allowing movement
red light   -> Visitor reaches golden pass
```

The point of the demo would not be traffic simulation. The point would be to show that CPUX repetition is controlled by Field stability, not by hidden loop code.

---

## Backend Golden Pass

In backend mode, golden pass usually means the CPUX has completed its autonomous work.

```text
Field state stable
       |
       v
Visitor scan
       |
       v
No eligible IC
       |
       v
Golden pass
       |
       v
Terminate CPUX
```

---

## Frontend Golden Pass

In frontend mode, golden pass means the CPUX has no more autonomous work right now.

The Visitor sleeps, but the Field remains alive.

```text
Field state stable
       |
       v
Visitor scan
       |
       v
No eligible IC
       |
       v
Golden pass
       |
       v
Visitor sleeps
       |
       v
Human action from GridLookout
       |
       v
Receptor IC direct activation
       |
       v
ic:pickup reflected Signal
       |
       v
Field absorbs update
       |
       v
Visitor wakes
```

This is the key frontend distinction: golden pass is not death of the CPUX. It is a stable pause until new perception enters the Field.

---

## Pull And Copy

An IC may extract from the Field using different policies.

`copy`

The required Pulses remain available to other ICs.

`pull`

The required Pulses are removed or consumed for exclusive use.

This allows designers to express whether a perception can be shared or should be consumed by one path.

---

## Golden Pass

When the Visitor can activate no more ICs, it reaches a golden pass.

In backend mode, golden pass may terminate the CPUX.

In frontend mode, golden pass may put the Visitor to sleep until a Field change wakes it.

---

## Developer Rule

If a CPUX feels like a rigid chain of function calls, revisit the synctest design.

The point is not only order. The point is situational readiness.
