---
title: Canonical Grid Positioning (CGP) and Nesting Rules
order: 1
description: A practical introduction to Canonical Grid Positioning (CGP), nested CGP for Pulse Fields, and the Pickup-area prototyping idea in GridLookout.
---

# Canonical Grid Positioning (CGP) and Nesting Rules

## Why CGP exists

Most UI systems teach placement in pixels first:

- put this box at 120px from the left
- make this width 300px

That works only until the screen changes.

Canonical Grid Positioning (CGP) takes a different approach. It says:

> First define the grid of the available space.  
> Then place the element inside that grid.

This gives a placement method that a human can think in, and a machine can execute on any rectangular device boundary.

## The core idea

CGP does not position things in pixels.

It positions things by:

1. defining a bounded viewport as a grid of rows and columns- we refer to this as a viewgrid too.
2. choosing a starting cell inside that grid
3. choosing how many rows and columns the element spans

Pixels are computed later by the renderer.

## CGP is not just four numbers

A shorthand description of CGP often uses four numbers:

- start row
- start column
- row span
- column span

That shorthand is incomplete by itself.

Those four numbers only make sense inside a grid context.

So a complete CGP definition is:

- viewport rows (viewgrid rows)
- viewport columns  (viewgrid columns)
- start row
- start column
- row span
- column span

In JSON form:

```json
{
  "viewport": {
    "rows": 8,
    "columns": 12
  },
  "position": {
    "startCell": [2, 4],
    "span": [3, 5]
  }
}
```

## Why viewport rows and columns matter

Without the viewport grid, the same placement numbers mean very different things.

Example:

```json
{
  "position": {
    "startCell": [1, 1],
    "span": [1, 1]
  }
}
```

This is meaningless by itself.

But inside:

- `2 × 2` → that cell is very large
- `24 × 24` → that cell is very small

So the viewport grid defines the **resolution of placement**.

That gives the designer a powerful control:

- low-density grid → coarse layout
- high-density grid → fine layout

This is how two small fields can be kept apart, or how large Pulse regions can be planned cleanly, without using pixels directly.

## Canonical validity rules

A CGP definition is valid only if:

- `viewport.rows >= 1`
- `viewport.columns >= 1`
- `startRow >= 1`
- `startCol >= 1`
- `rowSpan >= 1`
- `colSpan >= 1`
- `startRow + rowSpan - 1 <= viewport.rows`
- `startCol + colSpan - 1 <= viewport.columns`

This guarantees the element stays inside its viewport.

## Runtime pixel projection

At runtime, let the actual rectangular rendering surface be:

- width = `VW`
- height = `VH`

If the CGP says:

- `viewport.rows = R`
- `viewport.columns = C`
- `startCell = [SR, SC]`
- `span = [RS, CS]`

then the renderer computes:

- `cellWidth = VW / C`
- `cellHeight = VH / R`

and:

- `x = (SC - 1) * cellWidth`
- `y = (SR - 1) * cellHeight`
- `width = CS * cellWidth`
- `height = RS * cellHeight`

This is the standard GridLookout projection rule.

## Human–machine symmetry

CGP supports a simple symmetry:

- a human thinks in bounded relative regions
- a machine calculates the exact pixels for the device

The human thinks:

> divide this space into rows and columns,  
> and place the item here

The machine does:

> compute the pixel rectangle for the current device

This is the main reason CGP is useful as a platform-neutral positioning convention.

## Pulse-level CGP

In GridLookout, a **Pulse** is the primary visual unit.

A Pulse may carry a CGP definition that places it in the outer runtime viewport.

Example:

```json
{
  "pulsePhrase": "bank_account_details",
  "visual": {
    "viewport": { "rows": 8, "columns": 12 },
    "layer": 1,
    "position": {
      "startCell": [1, 8],
      "span": [3, 5]
    }
  }
}
```

This places the Pulse in the outer GridLookout viewport.

## Response Array Convention and fields

A Pulse Response may be simple or structured. In the structured case, the Response uses `META` rows to declare field names, followed by data rows.

Example:

```json
[
  ["META", "bank_name", "account_number", "account_type"],
  ["ABC Bank", "12345678", "Savings"]
]
```

This means the Pulse carries named fields already. That makes it natural to render those fields inside the Pulse.

The Pulse still remains **one concern**. The fields are parts of that concern.

## Field-level CGP

A Pulse may optionally define CGP for fields inside the Pulse.

This means:

- Pulse CGP places the Pulse in the outer viewport
- Field CGP places each field inside the Pulse boundary

Example:

```json
{
  "fieldViewport": { "rows": 6, "columns": 6 },
  "fieldRender": {
    "bank_name": {
      "type": "show",
      "position": { "startCell": [1, 1], "span": [1, 6] }
    },
    "account_number": {
      "type": "input",
      "position": { "startCell": [2, 1], "span": [2, 6] }
    },
    "account_type": {
      "type": "act",
      "actKind": "button",
      "position": { "startCell": [4, 1], "span": [1, 6] }
    }
  }
}
```

## Nesting rule

The nesting rule is simple.

### Step 1
Resolve the Pulse CGP against the outer runtime viewport.

### Step 2
Obtain the Pulse rectangle in pixels.

### Step 3
Treat that Pulse rectangle as the runtime viewport for the fields.

### Step 4
Resolve each field CGP inside that Pulse-local viewport.

So:

- Pulse CGP is global to the current GridLookout surface
- Field CGP is local to the Pulse

## Formal nested projection

### Pulse level

Given outer runtime viewport `VW × VH`:

- `pulseCellWidth = VW / viewport.columns`
- `pulseCellHeight = VH / viewport.rows`
- `pulseX = (startCol - 1) * pulseCellWidth`
- `pulseY = (startRow - 1) * pulseCellHeight`
- `pulseWidth = colSpan * pulseCellWidth`
- `pulseHeight = rowSpan * pulseCellHeight`

### Field level

Given Pulse rectangle `pulseWidth × pulseHeight`:

- `fieldCellWidth = pulseWidth / fieldViewport.columns`
- `fieldCellHeight = pulseHeight / fieldViewport.rows`
- `fieldX = pulseX + (fieldStartCol - 1) * fieldCellWidth`
- `fieldY = pulseY + (fieldStartRow - 1) * fieldCellHeight`
- `fieldWidth = fieldColSpan * fieldCellWidth`
- `fieldHeight = fieldRowSpan * fieldCellHeight`

## Field types

A field may also declare a behavior type.

Recommended core types:

- `show` → display only
- `input` → user types into it
- `act` → emits an Intention

For `act`, the rendering style may further specify:

- button
- option
- radio
- toggle
- select

This gives a uniform interaction grammar for Intention Space.

## Interaction discipline

A recommended perceptive interaction rule is:

- tap Pulse → Pulse takes the whole available viewport
- tap Field → Field expands within the Pulse boundary, or within a focused Pulse view

This preserves the idea that:

- Pulse is the main unit of attention
- Field is a sub-focus inside the Pulse

## Pickup area as prototyping aid

CGP becomes much easier to understand when paired with a **Pickup area**.

The Pickup area is a prototyping surface where the designer:

1. selects a Pulse region from a visible grid
2. adds that Pulse to a bounded preview area
3. sees how the Pulse is rendered
4. sees how fields sit inside the Pulse
5. tests tap-to-expand behavior

Pickup is useful because it makes CGP visible before a full application is built.

### Important Pickup principle

Pickup is only a prototyping and perceptual aid.

The canonical source of truth remains the CGP definition itself.

## Why Pickup helps beginners

Without Pickup, CGP looks abstract.

With Pickup, the learner can see:

- a grid
- a chosen region
- a Pulse in that region
- fields arranged inside it
- interactive types like `input` and `act`

So Pickup acts as a bridge between abstract placement and rendered UI.

## Relationship to GridLookout architecture

GridLookout should treat CGP as its core spatial contract.

At minimum, a GridLookout renderer should:

1. accept Pulse-level CGP
2. compute pulse pixel rectangles from runtime viewport
3. optionally accept field-level CGP
4. resolve field-level CGP inside Pulse boundaries
5. support layer ordering
6. support perceptive interaction such as tap-to-expand

This keeps GridLookout platform-neutral while still being precise.

## Constraints for correct use

To preserve Pulse integrity:

- field CGP must remain local to the Pulse
- fields enrich a Pulse; they do not replace Pulse granularity
- if separate concerns emerge, use multiple Pulses grouped in a Signal rather than one overloaded Pulse

This keeps the rendering model aligned with the Response Array Convention.

## Minimal teaching sequence

For beginners, CGP can be taught in three steps:

### 1. Define the viewport grid
How many rows and columns divide the space?

### 2. Define the placement
Where does the element start, and how many cells does it span?

### 3. Repeat inside the Pulse
Use the same method again for fields inside the Pulse.

That is the whole idea of CGP and nested CGP.

## Summary

Canonical Grid Positioning (CGP) is a bounded, grid-relative positioning convention in which an element is defined by:

- viewport row count
- viewport column count
- starting cell
- cell span

Nested CGP applies the same rule recursively inside enclosing elements, especially for Pulse Fields inside a Pulse.

This gives GridLookout:

- a pixel-independent placement grammar
- a human-teachable spatial language
- a machine-executable rendering rule
- a consistent path from Pulse data to perceptive UI

## Next practical steps

A useful next round of testing is:

- multiple Pulses in one GridLookout surface
- multiple field types inside a Pulse
- `act` fields rendered as button, radio, option, select
- field expansion inside focused Pulse view
- layer interactions across multiple Pulses
