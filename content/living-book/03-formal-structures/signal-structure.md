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

## Design-Time Use

The same Signal shape can be used as a design-time condition.

In the Green Light sample, the human or AutoInteraction path may send:

```json
{
  "id": "S_move_if_allowed_001",
  "intention": {
    "id": "I_move_if_allowed"
  },
  "pulses": [
    {
      "phrase": "current light",
      "tv": "Y",
      "response": ["green"]
    },
    {
      "phrase": "current position",
      "tv": "Y",
      "response": ["start"]
    },
    {
      "phrase": "_perception_mode",
      "tv": "Y",
      "response": ["act"]
    }
  ],
  "trace": {
    "traceId": "green-light-run-001",
    "source": "gridlookout",
    "receptorICId": "IC_move_if_allowed"
  }
}
```

That same shape can be reused as a designated input. It describes when an IC can execute:

```json
{
  "intention": {
    "id": "I_move_if_allowed"
  },
  "requiredPulses": [
    {
      "phrase": "current light",
      "tv": "Y"
    },
    {
      "phrase": "current position",
      "tv": "Y"
    }
  ]
}
```

As a designated output, it describes what the DN must emit before O_reflector can reflect the result:

```json
{
  "intention": {
    "id": "I_movement_result"
  },
  "requiredPulses": [
    {
      "phrase": "movement allowed"
    },
    {
      "phrase": "current position"
    }
  ]
}
```

This gives Signal a dual life:

```text
runtime carrier of Pulse responses
synctest condition for execution
output validation condition for reflection
```

The CPUX engine can therefore ask three different questions about the same representation:

```text
What does this DN receive?
Is the current Field ready for this DN to start?
Is the emitted result valid enough for the Field to absorb?
```

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
