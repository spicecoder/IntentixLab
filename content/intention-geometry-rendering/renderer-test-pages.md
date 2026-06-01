---
title: Renderer Test Pages
order: 7
description: Self-contained HTML and React GridLookout renderer demos for testing the same intention geometry in different rendering surfaces.
---

# Renderer Test Pages

The reader should be able to test the GridLookout rendering idea directly.

These two self-contained pages render the same GridRobe-style manifest through two different browser surfaces:

- a native HTML Custom Element renderer
- a React renderer

They are intentionally small test surfaces. Their purpose is not to be a finished application. Their purpose is to let the reader see the same geometry-after-layout rule expressed through two native rendering paths.

Each page includes an editable manifest panel rendered as its own GridLookout-managed perceptive cell. Change a cell's `position.startCell` or `position.span`, apply the manifest, and the surface will recompute the projected geometry.

## Open the Test Pages

- [Test the HTML Web Component renderer](/demos/intention-geometry-rendering/gridlookout-html-renderer.html)
- [Test the React renderer](/demos/intention-geometry-rendering/gridlookout-react-renderer.html)

## What to Test

Open each page, then test the same behaviours:

1. The cells appear in the same relative locations.
2. The cells preserve their spatial relationships when the browser window is resized.
3. A tap or click focuses a cell into the full surface.
4. A double tap or restore gesture returns the cell to its original projected region.
5. Non-focused cells are visually de-emphasised while the focused cell occupies the surface.
6. Editing the manifest repositions or resizes the same cells without changing the renderer code.
7. The manifest editor itself occupies a projected GridLookout region instead of floating over the rendered cells.

Example change:

```json
"position": { "startCell": [1, 1], "span": [3, 3] }
```

Apply the same edit in both pages and compare the result.

## Why These Pages Matter

The HTML page demonstrates the platform-neutral surface idea with browser-native Custom Elements.

The React page demonstrates the same geometry through a React component tree.

The important comparison is not whether their internal code looks the same. It should not. The important comparison is whether the same manifest produces the same intention geometry.

```text
same manifest
same grid projection
different rendering stack
same perceptual topology
```

That is the practical testing path for Intention Geometry Rendering.
