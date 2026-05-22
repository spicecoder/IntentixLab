---
title: Perception Before Intention
order: 4
description: Why CPUX places perception before intention, and intention before execution.
---

# Perception Before Intention

Intention does not arise in empty space.

Before a person acts, something is perceived as relevant. A field is noticed. A warning is understood. A button is recognised as available. A result is accepted, questioned, or rejected.

Perception comes before intention.

---

## Perception As Relevance Recognition

In this book, perception does not mean only sensory input.

Perception means:

> the continuous, context-sensitive engagement through which an agent identifies relevance before intention and action emerge.

This applies to humans first, but it also gives a disciplined way to discuss software participation.

A system can only respond well when the relevant situation has been represented well.

---

## From Perception To Pulse

CPUX represents perception through Pulses.

For example:

```text
<"username", Y, ["alice"]>
<"password entered", Y, ["***"]>
<"credentials valid", UN, []>
<"login complete", N, ["false"]>
```

These are not just variables. They are represented perceptual claims inside a situation.

Their meaning depends on the Intention and Field in which they participate.

---

## From Pulse To Intention

An Intention provides the semantic communication context for a Pulse set.

A Pulse such as:

```text
<"username", Y, ["alice"]>
```

means one thing under an intention to validate credentials, another under an intention to update profile details, and another under an intention to audit user activity.

The Pulse carries perception.

The Intention carries stance.

Together they form a Signal.

---

## From Intention To Execution

Execution should begin only when a situation is stable enough for a Design Node to act.

In CPUX, this is handled through the Field and Visitor.

The Visitor does not simply call the next function. It checks whether the Field contains the necessary Intentions and Pulses for an Intention Container to activate.

This is a different question from procedural sequencing.

It asks:

```text
Has the situation become ready for this computation?
```

---

## Why Direct UI Result Still Fits

In frontend CPUX, a human action can go directly from a GridLookout Cell to its receptor IC.

This direct path does not weaken the model. It protects the human perception loop.

The originating Cell receives the IC result directly from the O_reflector path. The same reflected Signal is also broadcast for Field absorption and subscription updates.

This preserves two needs at once:

- the human sees a result without waiting for broader field causality
- the CPUX Field still absorbs the reflected Signal in an ordered way

Human perception remains first, while system stabilisation continues.

---

## The Design Rule

Do not begin by asking what code should run.

Begin by asking:

```text
What perception has become relevant?
What intention carries it?
What situation must stabilise before execution proceeds?
```

That is the CPUX order:

```text
perception -> intention -> execution -> stabilisation
```

