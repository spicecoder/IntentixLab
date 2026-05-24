---
title: AutoInteraction
order: 9
description: AutoInteraction as autonomous interaction through represented UI Signals, where human or non-human Design Nodes can drive CPUX processes through Pulse-based intention rather than hidden UI automation.
---

# AutoInteraction

*Autonomous interaction through represented Signals*

---

## Starting Point

Modern software automation often treats the user interface as something to manipulate from outside.

An automation script may:

- click a selector
- type into a field
- wait for a screen
- scrape a result
- repeat a sequence

This is useful, but it remains outside the semantic structure of the application.

AutoInteraction begins from a different idea:

> if UI interaction can be represented as Signals and Pulses, then autonomous interaction can be performed through represented intention rather than hidden UI manipulation alone.

---

## The Human Interaction Model

In CPUX, a human user can be understood as a Design Node-like participant.

The human:

```text
perceives the UI
interprets relevance
forms intention
acts through GridLookout
emits a Signal
observes the reflected result
```

The UI is not merely a screen. It is a perceptual surface made of Cells.

Those Cells expose Pulses.

A human action can therefore be represented as a Signal constructed from UI Pulse context.

---

## The AutoInteraction Shift

AutoInteraction asks:

```text
Can another DN drive the same represented interaction path?
```

That DN may be:

- an AI model
- a scripted autonomous agent
- a test runner
- a monitoring process
- a recovery controller
- a simulation engine

Instead of controlling pixels or selectors as the primary model, the AutoInteraction DN emits Signals into CPUX.

```text
AutoInteraction DN
      |
      v
Signal := <Intention, PulseSet>
      |
      v
receptor IC
      |
      v
O_holder -> DN -> O_reflector
      |
      v
Field stabilisation
```

---

## Not Merely UI Automation

Traditional UI automation says:

```text
click button X
type value Y
wait for element Z
```

AutoInteraction should say:

```text
emit Intention I
with Pulse set P
to receptor IC R
observe reflected Signal S
continue if Field state permits
```

This moves automation from surface manipulation toward represented participation.

The automation is no longer only acting on the UI. It is participating in the same Intention Space as the human user.

---

## Why This Matters

AutoInteraction could support:

- autonomous testing
- assisted form completion
- AI-guided interaction
- recovery after interruption
- monitoring flows in health or banking systems
- simulation of user journeys
- accessibility support
- multi-App orchestration through FieldBoard

The important constraint is that the autonomous process should remain visible as Signal-based interaction.

It should not become a hidden power that bypasses human-centred design.

---

## Relation To Stabilising Intelligence

AutoInteraction can be understood as a stabilisation process.

An autonomous DN observes reflected Signals and Field state, then decides whether another Signal should be emitted.

If the Field reaches golden pass, the process may stop or sleep.

If the Field remains unstable, the AutoInteraction DN may continue to emit Signals until a stable situation is reached or a failure condition is reflected.

This connects AutoInteraction directly to Stabilising Intelligence:

```text
represented perception
-> autonomous intention
-> reflected result
-> Field stabilisation
```

---

## Risk And Boundary

AutoInteraction must be designed carefully.

If an autonomous DN can drive interaction, it must also be bounded by:

- explicit Intentions
- visible Pulse sets
- receptor IC permissions
- FieldBoard trigger rules
- audit records
- human consent where required

Otherwise, AutoInteraction could reproduce the same hidden behaviour that CPUX is trying to avoid.

The principle should be:

> autonomous interaction must remain intention-representable.

---

## Research Direction

AutoInteraction opens several research questions:

- How should a UI expose its Pulse surface to a non-human DN?
- What permission model should govern autonomous Signal emission?
- How does a human inspect or revoke AutoInteraction?
- Can an LLM act as an AutoInteraction DN safely inside a CPUX Field?
- How does golden pass define completion for autonomous interaction?
- Can multi-App FieldBoard coordination remain accountable when AutoInteraction crosses app boundaries?

These questions belong in research before they become product features.

