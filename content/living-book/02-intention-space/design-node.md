---
title: Design Node
order: 8
description: Design Node as the independently executable computation unit that absorbs and emits Signals.
---

# Design Node

A Design Node is an independently executable unit of computation.

It absorbs a Signal, performs computation, and emits a Signal:

```text
execute(inputSignal) -> resultSignal
```

In CPUX, this is where explicit computation belongs.

---

## Black Box, Clear Contract

A Design Node may be written in different languages or hosted in different runtime environments.

What matters is the contract:

```text
absorb Signal
perform computation
emit Signal
```

The CPUX runtime does not need to know the internal logic of every DN. It needs the DN's Signal contract to be explicit.

---

## Why Design Nodes Should Be Independent

A DN should be testable outside the full CPUX engine.

This supports:

- unit testing
- reuse
- cross-platform execution
- language independence
- AI participation
- safer debugging

The DN should not depend on hidden UI state or invisible global application state. Its context should arrive through the Signal.

---

## The Human As A Design Node

The human can also be understood as a Design Node in the broader perceptual loop.

The human:

```text
absorbs reflected situation
interprets relevance
forms intention
acts
emits a new Signal through the UI
```

This is not a technical reduction of the human. It is an architectural reminder that the human is an active participant in computation.

---

## AI As A Design Node

An AI model can also participate as a Design Node.

It may absorb a Signal, reason over the Pulse set, and emit a reflected Signal.

The surrounding CPUX structure helps keep the AI contribution bounded by:

- the Intention
- the input Pulses
- the Field context
- the reflected output
- the human-facing result

This makes AI participation more inspectable.

---

## Developer Rule

Keep computation in Design Nodes.

Keep reflection in Objects.

Keep human-facing perception in GridLookout.

This separation is one of the main disciplines of CPUX.

