---
title: Human UI And AutoInteraction Bridge
order: 15
description: A bridge chapter explaining the human user as a Design Node, UI Cells as Pulse surfaces, and AutoInteraction as a future autonomous Signal-driving model.
---

# Human UI And AutoInteraction Bridge

CPUX is not only a machine-to-machine runtime. It is a runtime that treats the human perceptual loop as part of the computation.

This means the human user can be understood as a Design Node-like participant.

The UI becomes the perceptual surface through which that human Design Node receives and emits Signals.

---

## The Human User As A Design Node

In Intention Space, a Design Node absorbs a Signal, performs computation, and emits a Signal.

The human does something comparable at the level of lived cognition:

```text
perceive UI situation
      |
      v
interpret relevance
      |
      v
form intention
      |
      v
act through UI
      |
      v
emit Signal through GridLookout
```

This does not reduce the human to software.

It does the opposite. It reminds the software model that the human is already an active analytic participant.

---

## UI Cells As Pulse Surfaces

GridLookout exposes UI through Cells.

Each Cell can correspond to a Pulse or action context.

A form, dashboard, game board, health monitor, or banking screen may therefore be understood as a collection of Pulse-bearing Cells.

```text
UI screen
  |
  |-- Cell: username
  |-- Cell: password entered
  |-- Cell: submit login
  |-- Cell: login message
```

When the human acts, the UI can construct a Signal from the relevant Cell Pulses.

---

## Virtual UI Signal

A UI action may produce a virtual Signal:

```text
Signal:
  Intention: I_validate_login
  Pulses:
    <"username", Y, ["alice"]>
    <"password entered", Y, ["***"]>
    <"submit login", Y, []>
    <"_perception_mode", Y, ["commit"]>
```

This Signal is virtual in the sense that it is not a physical object on the screen.

It is the represented communication produced by the UI surface from human action.

The receptor IC receives it as an ordinary CPUX Signal.

---

## UI Exposed To A DN

Once UI interaction is represented as Signals and Pulses, the UI can be exposed to a DN.

That DN may be:

- the human user
- a scripted test runner
- an AI assistant
- an autonomous monitor
- a simulated user
- a cross-platform automation layer

The important point is that the interaction path remains Signal-based.

The UI is not merely clicked from outside. It is interpreted as a Pulse surface and driven through represented Intention.

---

## AutoInteraction

This opens the door to **AutoInteraction**.

AutoInteraction means autonomous driving of an interaction process through represented Signals, rather than through hidden UI automation alone.

```text
AutoInteraction DN
        |
        v
constructs Signal from intended UI Pulse context
        |
        v
receptor IC
        |
        v
CPUX Field stabilisation
```

The difference from ordinary automation is important.

Ordinary automation may say:

```text
click this button
type this value
wait for this selector
```

AutoInteraction should say:

```text
emit this intention
with these represented perceptions
into this receptor IC
then observe the reflected Signal
```

---

## Higher-Fidelity Testing

Developers can keep this model in mind when setting up higher-fidelity tests.

CPUX already gives a built-in structural test at the IC boundary. O_reflector can compare the DN's emitted Signal against the designated output expectation:

```text
Designated output:
  Intention + required Pulse/TV set

DN emitted Signal:
  Intention + actual Pulse/TV set

O_reflector:
  match -> reflect
  mismatch -> reject / error / hold for handling
```

That confirms that the DN emitted the right kind of Signal.

After that succeeds, developers may want to test the actual responses carried by the Pulses. This is where the UI-as-Pulse-surface model becomes useful.

An AutoInteraction DN, test runner, or simulated user can drive the same represented interaction path and inspect the reflected Signal response values:

```text
test DN or simulated user
      |
      v
Signal from UI Pulse context
      |
      v
receptor IC
      |
      v
O_reflector structural match succeeds
      |
      v
test actual Pulse responses
      |
      v
confirm Field stabilisation
```

In this way, CPUX can support two levels of confidence:

- structural confidence: the emitted Signal matches the designated output Pulse/TV set
- response confidence: the actual values carried by the reflected Pulses are correct for the situation

This keeps testing aligned with the CPUX model rather than falling back only to external UI scripting.

---

## Developer Rule

When designing a UI for CPUX, ask:

```text
What Pulses does this UI surface expose?
What Signal does a human action produce?
Could another DN drive the same represented interaction path?
```

If the answer is yes, the UI is ready for both human interaction and future AutoInteraction.
