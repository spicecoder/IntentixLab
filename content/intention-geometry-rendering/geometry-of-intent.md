---
title: Geometry of Intent
order: 3
description: The mathematical foundation for layout-first, geometry-second rendering and uniform cross-platform UI testing in GridLookout.
---

# Geometry of Intent

The Geometry of Intent is the theoretical foundation for testing GridLookout renderers across multiple native platforms.

It gives a way to ask:

```text
Did the web renderer, React renderer, Android renderer, and future native renderer preserve the same intention geometry?
```

The answer should not depend on screenshots alone. It should depend on whether every renderer preserves the same topological relationships after projecting the manifest into its own native layout system.

## The Problem With Pixel-First UI

Most UI testing is platform-specific because most UI layout is platform-specific.

The web has CSS layout and the DOM. React has a component tree over the DOM. Android has `View`, `ViewGroup`, Compose, density buckets, measure specs, and lifecycle events. Flutter, iOS, desktop, and embedded surfaces all have their own rendering process.

If the interface is defined directly in those native layout systems, then cross-platform testing becomes comparison after the fact:

```text
render separately -> screenshot separately -> compare visually
```

That is useful, but it is late. The renderer has already made many platform-specific layout decisions.

GridLookout changes the test target.

```text
manifest topology -> canonical projection -> native rectangle set -> platform rendering
```

The invariant is established before platform-specific painting begins.

## Topological Environment

GridLookout treats the UI as a bounded topological environment made of Pulse Cells.

A Pulse Cell is not first a pixel box. It is a region inside a declared grid.

```json
{
  "visual": {
    "grid": { "rows": 10, "columns": 10 },
    "position": {
      "startCell": [2, 2],
      "span": [4, 4]
    }
  }
}
```

The grid defines the environment. The `startCell` and `span` define the region. The native runtime later turns that region into concrete geometry.

This means the renderer can be tested against the region it was supposed to preserve, not only against the pixels it happened to paint.

## Linear Projection

For a surface with width `W` and height `H`, and a GridLookout visual grid with `C` columns and `R` rows:

```text
stepX = W / C
stepY = H / R
```

For a cell:

```text
startCell = [startRow, startColumn]
span = [rowSpan, columnSpan]
```

the projected native rectangle is:

```text
left = (startColumn - 1) * stepX
top = (startRow - 1) * stepY
width = columnSpan * stepX
height = rowSpan * stepY
right = left + width
bottom = top + height
```

In vector form, device scaling can be understood as a positive linear projection:

```text
[x']   [Sx  0 ] [x]
[y'] = [0   Sy] [y]
```

where:

```text
Sx > 0
Sy > 0
```

Because both scale factors are positive, the projection preserves ordering.

If a region begins to the left of another region in the manifest, it remains to the left after projection. If it begins above another region, it remains above after projection.

## Order Invariants

The important mathematical property is not that the pixel values stay the same. They should not stay the same when the surface changes.

The important property is that the order relationships stay the same.

For any two projected cells `A` and `B`, a renderer can test relationships such as:

```text
A.right <= B.left       A is left of B
A.bottom <= B.top       A is above B
A.left >= B.right       A is right of B
A.top >= B.bottom       A is below B
```

It can also test containment:

```text
A.left >= parent.left
A.top >= parent.top
A.right <= parent.right
A.bottom <= parent.bottom
```

And overlap policy:

```text
if A and B overlap, layer order must decide visibility
if A and B are not declared to overlap, projection must not create overlap
```

These are cross-platform tests. They do not depend on whether the native implementation is DOM, React, Android, Flutter, or something else.

## From Geometry to Uniform Testing

GridLookout conformance can therefore be tested in two stages.

### Stage 1: Geometry Conformance

Every renderer should expose, or be able to report in test mode, the projected rectangle for every cell:

```json
{
  "cellId": "pack_travel_bag_001",
  "rect": {
    "left": 120,
    "top": 80,
    "width": 320,
    "height": 240
  },
  "layer": 1
}
```

The test runner compares the native result with the canonical projection for the same manifest and surface size.

Allowed tolerance may be platform-specific because native renderers round floats differently:

```text
abs(native.left - canonical.left) <= epsilon
abs(native.top - canonical.top) <= epsilon
abs(native.width - canonical.width) <= epsilon
abs(native.height - canonical.height) <= epsilon
```

### Stage 2: Topology Conformance

The test runner verifies that the same relationships are preserved:

- every cell remains inside its parent surface
- non-overlap declarations remain non-overlapping
- intentional overlap follows declared layer order
- relative left/right/above/below relationships remain stable
- focus projection can expand and restore without losing the original cell rectangle

This is the practical testing value of the Geometry of Intent.

## Why This Supports Multiple Native Renderers

The native renderer is allowed to be idiomatic:

| Platform | Native mechanism |
|---|---|
| Web Component | Custom Elements, Shadow DOM, CSS variables |
| React | State, JSX, absolute positioned cell shells |
| Android | `ViewGroup.onMeasure()` and `onLayout()` |
| iOS | `layoutSubviews()` and child frames |
| Flutter | custom layout delegate, Stack, or RenderObject |

The renderer is not allowed to change the intention geometry.

That gives a shared testing contract:

```text
Same manifest.
Same surface size.
Same canonical rectangle set.
Same topological relationships.
Different native painting systems.
```

## The Geometric Hypervisor

The GridLookout orchestrator acts like a geometric hypervisor.

It reads the manifest, computes the canonical rectangles, then gives each native cell a bounded surface.

```text
GridLookout Manifest
  -> Canonical Grid Orchestrator
  -> Projected Rectangles
  -> Passive Native Cell Surfaces
```

A cell may contain a React component, an Android view, a web component, a Flutter widget, or a canvas surface. To participate, it must satisfy passive-receptive rendering:

- accept the assigned external boundary
- fill that boundary
- avoid independent outer layout decisions
- scale internal content proportionally
- emit Signals instead of hidden business logic

## Testing the New Geometry After Layout Approach

GridLookout can be described as:

```text
layout first, geometry second, pixels last
```

The manifest declares the layout. The geometry phase projects it. The native platform paints the pixels.

Testing should follow the same order:

```text
test manifest validity
test canonical projection
test native rectangle conformance
test topological invariants
test visual rendering
test Signal interaction
```

Visual testing still matters, but it is no longer the first proof of correctness. The first proof is geometric.

That is why the Geometry of Intent matters: it gives Perceptive Apps a platform-neutral mathematical foundation for UI correctness.
