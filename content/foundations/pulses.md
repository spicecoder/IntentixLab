---
title: Pulses
order: 1
description: Understanding pulses — the atomic units of intention in CPUX computing.
---

# Pulses

A **Pulse** is the atomic unit of state declaration in the Intention Space framework. Unlike traditional variables that hold mutable state, a Pulse is a plain-language, immutable declaration of *what should be true* at a given point in a computational flow.

## Why Pulses?

In conventional programming, state is scattered across variables, configuration files, and implicit assumptions embedded in control flow. Pulses externalize this:

```json
{
  "pulse": "service-ready",
  "value": "Cloud Run instance healthy, accepting traffic on port 8080",
  "confidence": 0.95
}
```

> Pulses make the invisible visible — every assumption becomes an explicit, testable declaration.

## Properties of a Pulse

- **Immutable** — once declared, a pulse is not modified; new pulses are created
- **Observable** — any component can subscribe to pulse state changes
- **Composable** — pulses combine to form higher-order intentions
- **Traceable** — every pulse carries provenance metadata

## Pulse Lifecycle

| State | Meaning |
|-------|---------|
| `DECLARED` | Pulse has been stated but not validated |
| `ACTIVE` | Pulse conditions are currently met |
| `DEGRADED` | Pulse is partially satisfied |
| `EXPIRED` | Pulse conditions no longer hold |

This explicit lifecycle eliminates the "silent failure" problem where systems continue operating under invalid assumptions.
