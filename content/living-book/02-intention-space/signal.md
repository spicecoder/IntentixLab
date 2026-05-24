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

## Three Roles Of A Signal

In CPUX, a Signal is not only input data.

It has three related roles.

### 1. Input To A DN

A runtime Signal can carry the actual Pulse responses that a Design Node receives:

```json
{
  "intention": { "id": "I_move_if_allowed" },
  "pulses": [
    { "phrase": "current light", "tv": "Y", "response": ["green"] }
  ]
}
```

The DN reads the response values and computes a result.

### 2. Synctest Condition

A designated input Signal can also act as the test condition for whether an IC should execute.

For example:

```text
required Intention: I_move_if_allowed
required Pulse:     current light
```

The Visitor compares this designated input against the current Field. If the Field contains the required Intention and Pulse/TV condition, the IC becomes eligible.

This means the Signal is not merely data sent to a process. It is also the designer's declaration of the situation under which the process may run.

### 3. Output Validation

A designated output Signal also acts as the validation condition for the result emitted by a DN.

O_reflector compares the DN's emitted Signal with the configured expectation:

```text
expected Intention: I_movement_result
required Pulses:    movement allowed, current position
```

If the emitted Signal matches, O_reflector reflects it outward for direct result, subscribers, and Field absorption.

If it does not match, O_reflector can reject it, hold it, or raise an error condition.

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
