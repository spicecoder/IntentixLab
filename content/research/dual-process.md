---
title: Dual-Process Computation
order: 1
description: How Kahneman's dual-process theory maps onto generative and perceptual computation.
---

# Dual-Process Computation

The Intention Space framework draws a structural parallel between Kahneman's dual-process theory of cognition and two fundamental modes of computation.

## System 1 and System 2 in Computing

Kahneman distinguishes between fast, automatic **System 1** thinking and slow, deliberate **System 2** reasoning. We propose an analogous distinction in computational systems:

| Cognitive Mode | Computational Analogue | Intention Space Role |
|----------------|----------------------|---------------------|
| System 1 (Fast) | Pattern matching, caching, reactive pipelines | **Perceptual Computation** — pulse monitoring and signal propagation |
| System 2 (Slow) | Algorithmic reasoning, complex transformations | **Generative Computation** — Design Node processing |

## The Key Insight

Traditional software conflates these two modes. A single function might both *perceive* a state change and *generate* a response, making it impossible to reason about which mode is active. Intention Space separates them structurally.

## Implications for AI Interpretability

This separation has direct implications for understanding transformer attention mechanisms. When we can distinguish between perceptual and generative attention heads, we gain a principled framework for mechanistic interpretability.
