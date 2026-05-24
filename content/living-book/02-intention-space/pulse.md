---
title: Pulse
order: 2
description: Pulse as the smallest represented perception in Intention Space.
---

# Pulse

A Pulse is the smallest represented perception in Intention Space.

It is not simply a variable, event, property, or data field. A Pulse carries a phrase, a perceptual status, and an optional response area.

```text
Pulse := <phrase, TV, Response>
```

The Pulse is where human-centred computation begins to become representable.

---

## Phrase

The phrase is the semantic identity of the Pulse.

Examples:

```text
"username"
"password entered"
"credentials valid"
"cart item selected"
"door open"
"human confirmed intention"
```

The phrase should be meaningful enough for a human designer to understand, not only convenient for code.

This matters because CPUX is not only coordinating data. It is coordinating represented perceptions.

---

## TV

The TV value is the trivalent status of the Pulse:

```text
Y | N | UN
```

The TV value says how the perception currently stands inside a situation.

It is not merely a boolean. It is a way to hold affirmed, negated, and unresolved perceptual status without forcing premature certainty.

---

## Response

The Response area carries values associated with the Pulse.

For example:

```text
<"username", Y, ["alice"]>
<"selected product", Y, ["P001"]>
<"credentials valid", N, ["false"]>
<"shipping estimate", UN, []>
```

In CPUX, Response can also support accumulation. O_holder may keep an ordered history of values across successive activations.

---

## Sample Anchor: Current Light

In the Green Light sample, the current light is represented as a Pulse:

```json
{
  "phrase": "current light",
  "tv": "Y",
  "response": ["green"]
}
```

This does more than store a string.

It says:

- the represented perception is `current light`
- the perception is affirmed in the current situation
- the current response value is `green`

If the value later becomes red, the Pulse can keep the same phrase while changing the response:

```json
{
  "phrase": "current light",
  "tv": "Y",
  "response": ["red"]
}
```

The phrase remains stable. The situation changes.

---

## Why A Pulse Is Not Just Data

A data field often says:

```text
username = "alice"
```

A Pulse says more:

```text
<"username", Y, ["alice"]>
```

This tells us:

- what perception is being represented
- how it currently stands
- what response value belongs to it
- how it may participate in a Signal

The Pulse keeps the meaning closer to the human situation.

---

## Developer Rule

When defining a Pulse, ask:

```text
What perception is this phrase making explicit?
Who or what has authority over its current status?
What response value must remain visible?
```

If those questions cannot be answered, the Pulse may be too vague.
