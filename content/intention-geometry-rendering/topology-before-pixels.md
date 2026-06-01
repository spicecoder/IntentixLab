---
title: Topology Before Pixels
order: 2
description: The topology and geometry foundation behind GridLookout rendering for Perceptive Apps.
---

# Topology Before Pixels

GridLookout begins from a topology-oriented view of interface rendering.

A normal UI engine asks:

```text
How many pixels wide is this component?
```

GridLookout asks:

```text
Where does this perceptual concern belong inside the intention field?
```

This difference is important. A Perceptive App treats the human as part of the computation. If visual regions drift, overlap, or disappear during responsive reflow, the system has changed the human's perceptual context.

## The Topological Field

In GridLookout, a rendering surface is treated as a bounded field divided into rows and columns.

Each Pulse Cell declares:

- the grid resolution of the available surface
- the starting cell
- the span across rows and columns
- the layer
- the native renderer or interaction type
- the Pulse phrase and CPUX routing

The cell is not first a DOM element, Android view, or React component. It is first a bounded perceptual region.

## Order Preservation

When a device changes size, the runtime scales the surface. The important property is that positive scaling preserves order.

If cell A begins to the left of cell B in the grid, then a positive width projection keeps A to the left of B. If a cell begins above another cell, a positive height projection keeps that vertical order.

The renderer computes:

```text
stepX = surfaceWidth / columns
stepY = surfaceHeight / rows

x = (startColumn - 1) * stepX
y = (startRow - 1) * stepY
width = columnSpan * stepX
height = rowSpan * stepY
```

The pixel values change. The ordering relationship does not.

## Geometry Is a Projection

GridLookout separates two phases:

| Phase | Question | Output |
|---|---|---|
| Layout phase | What is the intended spatial relationship? | Grid coordinates |
| Geometry phase | What native rectangle does this become now? | Pixel or platform bounds |
| Rendering phase | How should this cell be painted? | DOM, view, canvas, widget |

This lets the same manifest render through different stacks while preserving the perceptual topology.

## Cell Boundaries Are Authority

Once the geometry phase assigns a boundary, the cell renderer must accept it.

The child component may choose typography, internal spacing, image fitting, and native controls. It may not decide its external position. It may not read the whole viewport and perform a second independent layout strategy.

This is the foundation of passive-receptive rendering.

## Why Reflow Alone Is Not Enough

Responsive layout is useful, but it often reinterprets the surface at each breakpoint.

GridLookout is stricter. It does not ask each component to negotiate space. It asks the manifest to declare the surface, then asks the runtime to project that surface consistently.

For Perceptive Apps, this means:

- a human can build spatial memory
- a Pulse keeps its visible identity
- gestures and receptor bindings remain attached to the same perceptual region
- computation can continue without the UI rewriting the human's context

The interface becomes a stable map of intention, not a cascade of competing layout decisions.
