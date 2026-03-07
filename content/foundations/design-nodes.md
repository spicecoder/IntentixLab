---
title: Design Nodes
order: 2
description: Design Nodes — the computational units that process pulses and produce forward states.
---

# Design Nodes

A **Design Node** (DN) is an independently executable unit of computation in the Intention Space framework. Unlike traditional functions that embed control flow logic, a Design Node operates purely on pulses — receiving them, processing them through pre-configured declarative logic, and producing new forward states.

## The Key Principle

> Design Nodes never connect directly to Objects. There is always an Intention between them: `DN → Intention → Object → Intention → DN`.

This separation is fundamental. It ensures that every data transformation is explicit, traceable, and reversible.

## Anatomy of a Design Node

```javascript
const DeploymentValidator = {
  name: "DeploymentValidator",
  receives: ["service-config-pulse", "health-check-pulse"],
  produces: ["deployment-ready-pulse"],
  
  transform: (pulses) => {
    const config = pulses["service-config-pulse"];
    const health = pulses["health-check-pulse"];
    
    return {
      pulse: "deployment-ready-pulse",
      value: config.valid && health.passing,
      confidence: Math.min(config.confidence, health.confidence)
    };
  }
};
```

## Independence

Design Nodes must be independently executable. They should not require a full Field infrastructure or framework context to run. This enables unit testing, composition, and reuse across different Intention Space configurations.
