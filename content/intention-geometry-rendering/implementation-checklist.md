---
title: Implementation Checklist
order: 6
description: A practical checklist for building or reviewing a GridLookout renderer for Perceptive Apps.
---

# Implementation Checklist

Use this checklist when building a GridLookout renderer for a new platform or reviewing an existing implementation.

## Manifest Handling

- Accept a GridLookout manifest or scene section from First Contact.
- Validate that every cell has a stable `cellId`.
- Validate that every cell has a `pulsePhrase`.
- Validate grid rows and columns are at least `1`.
- Validate `startCell` and `span` keep the cell inside the declared grid.
- Preserve layer order.

## Geometry Phase

- Measure the current native surface.
- Compute `stepX` and `stepY`.
- Project every cell into a native rectangle.
- Recompute after resize, rotation, split-screen change, foldable posture change, or surface recreation.
- Keep projection deterministic for the same surface size and manifest.

## Rendering Phase

- Create one native surface per GridLookout Cell.
- Assign the projected rectangle from the geometry phase.
- Keep the cell renderer passive about external layout.
- Use proportional internal rendering for text, media, and nested controls.
- Prevent internal overflow from hiding critical input regions.

## Interaction Phase

- Convert taps, text input, toggles, gestures, or sensor events into Signals.
- Include the declared receptor IC and action Intention.
- Include the current perception mode, such as `act`, `resume`, `reset`, or `commit`.
- Do not run hidden business logic inside the cell renderer.

## CPUX Reflection

- Apply direct receptor results for immediate feedback.
- Apply subscription updates only after matching IC id, Intention id, and Pulse phrase.
- Leave unmatched reflected Pulses untouched.
- Keep GridLookout unaware of CPUX internals such as FieldBoard traversal, Visitors, or DN execution.

## Focus and Restoration

- Support a focus projection where one cell can occupy the full surface.
- Dim or disable non-focused cells only at the orchestrator level.
- Restore the cell to its original projected rectangle.
- Keep the child renderer unaware of whether its current rectangle came from ordinary placement or focus projection.

## Platform Release Standard

A platform renderer is ready when it can demonstrate:

- a static manifest rendering
- resize or rotation projection
- at least one action Signal to a receptor IC
- at least one reflected update through subscription filtering
- focus and restore transformation
- no external layout decisions inside child cell renderers

The finished runtime should feel native to its platform, but geometrically faithful to the GridLookout contract.
