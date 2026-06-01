---
title: Intention Geometry Rendering
order: 1
description: A pillar for GridLookout rendering as the geometry layer of Perceptive Apps, from topology-first placement to native rendering standardisation.
---

# Intention Geometry Rendering

Intention Geometry Rendering is the rendering pillar for Perceptive Apps.

It explains how GridLookout turns a human-perceivable intention surface into a stable native rendering process across web, React, Android, iOS, Flutter, desktop, and embedded runtimes.

The core claim is simple:

> A Perceptive App should not begin with pixels. It should begin with stable perceptual regions that preserve human intention across devices.

In the CPUX client architecture, GridLookout is the native perceptual surface. CPUX owns computation. GridLookout owns rendering and human input. The bridge between them is not a view framework contract; it is a geometry contract carried by Pulses, Cells, Signals, receptors, and subscriptions.

## Reading Path

1. [Topology Before Pixels](./topology-before-pixels.html)
2. [GridLookout Rendering Contract](./gridlookout-rendering-contract.html)
3. [Geometry of Intent](./geometry-of-intent.html)
4. [Native Rendering Standardisations](./native-rendering-standardisations.html)
5. [Implementation Checklist](./implementation-checklist.html)
6. [Renderer Test Pages](./renderer-test-pages.html)

## Pillar Scope

This pillar is not a replacement for the CPUX architecture pages. It sits beside them.

CPUX answers:

```text
How does a perceptive computation run?
```

GridLookout rendering answers:

```text
How does the human-facing perceptual surface remain stable while that computation runs?
```

The answer is Canonical Grid Positioning, passive native surfaces, and a shared projection rule.

The mathematical foundation for this is the Geometry of Intent: a way to treat GridLookout rendering as a topological and geometric contract that can be tested uniformly across native runtimes.

Readers can also test the idea directly through two self-contained renderer pages: one browser-native HTML surface and one React surface.

## Rendering Ladder

```text
Intention
  -> Pulse
  -> Cell
  -> Grid position
  -> Native surface box
  -> Human perception
```

Each runtime may paint differently, but the geometry must be the same.

```text
GridLookout Manifest
  -> Canonical geometry phase
  -> Platform native layout boundary
  -> Passive cell renderer
  -> Gesture or input Signal
  -> CPUX receptor IC
```

## Why This Matters

Traditional UI layout often changes meaning when the screen changes. A card that was visually adjacent may be pushed below. A button that was clearly bound to a field may move away. A critical region may be hidden behind another responsive layer.

For a Perceptive App, this is not only a design problem. It is a computational problem, because the human is part of the computation loop.

GridLookout protects the perceptual surface by making spatial intention explicit:

- the layout is declared as cells inside a bounded grid
- the native runtime computes pixels only after the grid is known
- each cell receives an exact boundary
- the cell paints inside that boundary without taking control of external layout
- human actions return as Signals to declared receptor ICs

## Core Principle

```text
Layout first.
Geometry second.
Pixels last.
```

The designer declares the topology of the perceptual field. The runtime projects it into native geometry. The platform paints it.

That is Intention Geometry Rendering.
