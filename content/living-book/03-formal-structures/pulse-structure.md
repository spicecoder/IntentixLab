---
title: Pulse Structure
order: 2
description: A first canonical structure for representing a Pulse as phrase, trivalence, response, and optional metadata.
---

# Pulse Structure

A Pulse is the smallest represented perception in Intention Space.

Conceptually:

```text
Pulse := <phrase, TV, Response>
```

A first canonical structure can be:

```json
{
  "phrase": "username",
  "tv": "Y",
  "response": ["alice"],
  "meta": {
    "source": "gridlookout",
    "timestamp": "2026-05-22T08:30:00Z"
  }
}
```

---

## Required Fields

`phrase`

The semantic identity of the Pulse.

```json
"phrase": "username"
```

`tv`

The trivalent status:

```json
"tv": "Y"
```

Allowed values:

```text
Y | N | UN
```

`response`

An array carrying associated values:

```json
"response": ["alice"]
```

The array form allows both simple values and accumulated history.

---

## Optional Metadata

`meta` is optional.

It can carry implementation or trace information without changing the conceptual Pulse:

```json
"meta": {
  "source": "android-gridlookout",
  "cellId": "username_input",
  "timestamp": "2026-05-22T08:30:00Z"
}
```

Metadata should not replace the phrase, TV, or response. It should only help with tracing, debugging, replay, or platform context.

---

## Minimal Form

The minimal Pulse is:

```json
{
  "phrase": "username",
  "tv": "Y",
  "response": ["alice"]
}
```

---

## Developer Rule

Keep the Pulse small.

If a Pulse starts carrying many unrelated values, split it into clearer Pulses.

