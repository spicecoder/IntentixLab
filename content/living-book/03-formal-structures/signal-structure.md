---
title: Signal Structure
order: 4
description: A first canonical structure for representing a Signal as an Intention plus a Pulse set.
---

# Signal Structure

A Signal is identified communication:

```text
Signal := <Intention, PulseSet>
```

A first canonical structure can be:

```json
{
  "id": "S_login_attempt_001",
  "intention": {
    "id": "I_validate_login"
  },
  "pulses": [
    {
      "phrase": "username",
      "tv": "Y",
      "response": ["alice"]
    },
    {
      "phrase": "password entered",
      "tv": "Y",
      "response": ["***"]
    },
    {
      "phrase": "_perception_mode",
      "tv": "Y",
      "response": ["act"]
    }
  ],
  "trace": {
    "traceId": "trace-123",
    "source": "gridlookout",
    "receptorICId": "IC_validate_login"
  }
}
```

---

## Required Fields

`intention`

The semantic communication context:

```json
"intention": {
  "id": "I_validate_login"
}
```

`pulses`

The Pulse set carried under that Intention:

```json
"pulses": []
```

---

## Optional Fields

`id`

A runtime or persistence identifier for this Signal instance.

`trace`

Trace information for replay, debugging, GridLookout routing, and CPUX runtime correlation.

---

## Perception Mode

Frontend and interactive CPUX Signals should usually include the distinguished Pulse:

```json
{
  "phrase": "_perception_mode",
  "tv": "Y",
  "response": ["act"]
}
```

Common modes:

```text
act | resume | reset | commit
```

This lets O_holder handle accumulation, replay, purge, or freeze behaviour consistently.

---

## Minimal Form

```json
{
  "intention": {
    "id": "I_validate_login"
  },
  "pulses": [
    {
      "phrase": "username",
      "tv": "Y",
      "response": ["alice"]
    }
  ]
}
```

---

## Developer Rule

The Signal should explain why these Pulses are moving now.

If the Signal only looks like a data packet, its Intention is probably too weak.

