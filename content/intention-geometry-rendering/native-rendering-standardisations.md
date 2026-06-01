---
title: Native Rendering Standardisations
order: 5
description: Standard rendering patterns for implementing GridLookout across Web Components, React, Android, and other native runtimes.
---

# Native Rendering Standardisations

Every GridLookout runtime should implement the same projection rule, then translate the result into its native rendering process.

## Canonical Projection

Given:

```text
surfaceWidth
surfaceHeight
grid.rows
grid.columns
position.startCell = [startRow, startColumn]
position.span = [rowSpan, columnSpan]
```

Compute:

```text
stepX = surfaceWidth / max(1, grid.columns)
stepY = surfaceHeight / max(1, grid.rows)

left = (startColumn - 1) * stepX
top = (startRow - 1) * stepY
width = columnSpan * stepX
height = rowSpan * stepY
```

All native implementations should converge on this result.

## Web Component Standard

The browser-native implementation can use a parent orchestrator and passive Custom Elements.

```js
function projectCell(surface, cell) {
  const { grid, position } = cell.visual;
  const stepX = surface.width / Math.max(1, grid.columns);
  const stepY = surface.height / Math.max(1, grid.rows);

  return {
    x: (position.startCell[1] - 1) * stepX,
    y: (position.startCell[0] - 1) * stepY,
    width: position.span[1] * stepX,
    height: position.span[0] * stepY
  };
}
```

The host element receives the result:

```css
pulse-cell {
  position: absolute;
  transform: translate3d(var(--gl-x), var(--gl-y), 0);
  width: var(--gl-width);
  height: var(--gl-height);
  z-index: var(--gl-layer);
}
```

The Custom Element fills the assigned box:

```css
:host {
  display: block;
  width: 100%;
  height: 100%;
  container-type: inline-size;
}
```

## React Standard

React should keep GridLookout geometry outside the child component's layout decisions.

```jsx
function PulseCellSurface({ cell, layout, onSignal }) {
  return (
    <div
      style={{
        position: "absolute",
        transform: `translate3d(${layout.x}px, ${layout.y}px, 0)`,
        width: `${layout.width}px`,
        height: `${layout.height}px`,
        zIndex: cell.visual.layer
      }}
      onClick={() => onSignal(cell)}
    >
      <CellBody cell={cell} />
    </div>
  );
}
```

`CellBody` can be a normal React component, but it must treat its parent rectangle as the external authority.

## Android Standard

Android should place children in a GridLookout surface by measuring each child exactly to its projected span and laying it out at its projected origin.

```kotlin
override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
    val surfaceWidth = right - left
    val surfaceHeight = bottom - top

    for (i in 0 until childCount) {
        val child = getChildAt(i)
        val cell = cells[i]
        val visual = cell.visual
        val position = visual.position

        val stepX = surfaceWidth.toFloat() / max(1, visual.grid.columns)
        val stepY = surfaceHeight.toFloat() / max(1, visual.grid.rows)

        val renderLeft = ((position.startCell[1] - 1) * stepX).toInt()
        val renderTop = ((position.startCell[0] - 1) * stepY).toInt()
        val renderRight = renderLeft + child.measuredWidth
        val renderBottom = renderTop + child.measuredHeight

        child.layout(renderLeft, renderTop, renderRight, renderBottom)
    }
}
```

The Android cell view may use native Material components, Compose-hosted content, canvas drawing, or image surfaces internally. The outer GridLookout surface remains responsible for placement.

## iOS and Flutter Standard

iOS and Flutter should follow the same rule:

```text
parent GridLookout surface computes Rect
child renderer receives Rect
child renderer fills Rect
child renderer emits Signal
```

For iOS, this maps naturally to `layoutSubviews()` and child frame assignment.

For Flutter, it can map to a custom layout delegate, a `Stack` with positioned children, or a lower-level render object.

## Native Compliance Requirements

A GridLookout renderer is compliant when it satisfies these requirements:

| Requirement | Meaning |
|---|---|
| Same projection | The same manifest produces the same relative rectangles |
| Passive external layout | Child renderers do not negotiate outer placement |
| Internal proportional rendering | Typography, images, and controls adapt inside the assigned box |
| Signal output | Gestures and inputs emit declared Signals |
| Subscription input | Reflected CPUX updates target cells through explicit subscriptions |
| Focus transform support | The orchestrator can project a cell into a focus rectangle and restore it |

This lets platform teams write idiomatic native code without changing the intention geometry.
