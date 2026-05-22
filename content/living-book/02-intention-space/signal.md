---
title: Signal
order: 5
description: Signal as identified communication formed from an Intention and a Pulse set.
---

# Signal

A Signal is identified communication in Intention Space.

It combines an Intention with a set of Pulses:

```text
Signal := <Intention, PulseSet>
```

The Pulse set carries represented perception. The Intention gives the communication its semantic stance.

---

## Why Signals Matter

In traditional software, communication often appears as:

```text
function call
event
message
callback
route
topic
```

These mechanisms move data, but their semantic role is often implicit.

A Signal makes the runtime communication itself a named, inspectable participant.

This is important for:

- traceability
- replay
- audit
- cross-platform execution
- human-centred debugging
- AI participation inside bounded context

---

## Example

A login screen may emit a Signal like:

```text
Intention: "I_validate_login"

PulseSet:
  <"username", Y, ["alice"]>
  <"password entered", Y, ["***"]>
  <"_perception_mode", Y, ["act"]>
```

The same Pulse set under another Intention would not mean the same thing.

The Signal says:

```text
these perceptions are being carried for this purpose
```

---

## Signals And CPUX

Signals move through CPUX:

- a GridLookout Cell sends a Signal to a receptor IC
- a Design Node absorbs a Signal
- a Design Node emits a Signal
- O_reflector reflects a Signal
- a Field absorbs reflected Signals
- a FieldBoard may release or trigger further CPUX activity

The Signal is the unit of movement.

---

## Developer Rule

Do not name Signals only after technical transport.

Prefer names that preserve semantic purpose:

```text
I_validate_login
I_reflect_cart_state
I_confirm_human_commit
I_request_shipping_estimate
```

The Signal should help a future reader understand the situation, not only the code path.

