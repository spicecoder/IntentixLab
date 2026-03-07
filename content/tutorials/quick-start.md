---
title: Quick Start
order: 1
description: Get up and running with Intention Space in 15 minutes.
---

# Quick Start

This guide walks you through creating your first Intention Space application — a simple service health monitor that uses pulses to declare and validate system state.

## Prerequisites

- Node.js 18+
- Basic familiarity with JSON and JavaScript

## Step 1: Define Your Pulses

Create a file called `pulses.json`:

```json
{
  "pulses": [
    {
      "name": "service-healthy",
      "description": "The target service is responding within acceptable latency",
      "conditions": {
        "http_status": 200,
        "latency_ms": { "max": 500 }
      }
    },
    {
      "name": "monitoring-active",
      "description": "The monitoring system itself is operational",
      "depends_on": ["service-healthy"]
    }
  ]
}
```

## Step 2: Create a Design Node

```javascript
const HealthChecker = {
  name: "HealthChecker",
  receives: ["monitoring-active"],
  produces: ["service-healthy"],

  transform: async (pulses) => {
    const start = Date.now();
    const response = await fetch(process.env.TARGET_URL);
    const latency = Date.now() - start;

    return {
      pulse: "service-healthy",
      value: response.status === 200 && latency < 500,
      metadata: { latency, status: response.status }
    };
  }
};
```

## Step 3: Run and Observe

Every pulse state change is logged, every transition is traceable. No hidden logic, no silent failures.

> **Next:** Learn about [Design Nodes](/foundations/design-nodes.html) and how they compose into complex systems.
