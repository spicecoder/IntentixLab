# GridLookoutPulse Studio
## Integrated design for placement confirmation, PulseCell/PulseField authoring, and perception-based rendering

## 1. Purpose

GridLookoutPulse Studio is an integrated authoring and confirmation facility for GridLookout-based perceptive UI.

Its purpose is to let a designer do three things within one consistent environment:

1. define a PulseCell and PulseField in canonical JSON
2. confirm placement perceptually in a pickup area
3. render and interact with the same Pulse definitions using one common rendering discipline

The core intent is to remove drift between:
- authoring
- placement confirmation
- runtime rendering

The Studio should treat these as different projections of the same canonical definition, not as separate disconnected tools.

---

## 2. Core position

The Studio is based on one central discipline:

> layout first, then geometry

This means:
- the available visible area must be known first
- grid division is then applied to that area
- Pulse geometry is computed from the grid definition
- rendering happens only after that geometry is resolved

This same rule must hold in:
- main scene rendering
- pickup confirmation rendering
- focus/full takeover rendering

So pickup is not a special-case toy renderer. It is another valid projection of the same canonical Pulse definition.

---

## 3. Foundational concepts

### 3.1 Canonical PulseCell

A PulseCell is canonically defined by grid semantics, not by pixel size.

A PulseCell includes:
- pulse identity
- response convention
- viewport rows/columns
- layer
- start cell
- span
- render hints
- optional interaction binding

Canonical example:

```json
{
  "cellId": "cell_bank_account",
  "pulsePhrase": "bank_account_details",
  "tv": "UN",
  "responseConvention": {
    "version": "1.1",
    "mode": "structured"
  },
  "response": [
    ["META", "bank_name", "account_number", "account_type"],
    ["ABC Bank", "12345678999", "Savings"]
  ],
  "visual": {
    "viewport": { "rows": 8, "columns": 12 },
    "layer": 1,
    "position": {
      "startCell": [2, 7],
      "span": [4, 4]
    },
    "inputMethod": "display"
  },
  "render": {
    "headMode": "pulsePhrase",
    "bodyMode": "responseSections"
  }
}
```

### 3.2 Preview viewport

Pixel viewport width and height are not canonical Pulse coordinates.
They belong to rendering context.

However, the Studio may still use preview pixel sizes as:
- authoring aid
- pickup projection aid
- device simulation aid

So preview viewport is a Studio/runtime concern, not a Pulse identity concern.

### 3.3 PulseField

A PulseField is a structured body region rendered within a PulseCell.
It is not a separate placed scene object at the same level as PulseCell.
It is a field-oriented rendering discipline inside a PulseCell body.

Examples:
- bank form fields
- preferences list
- order items section
- profile attributes

### 3.4 Pickup area

The pickup area is a perception-confirmation surface.
It is used to confirm whether PulseCells feel correctly placed and scaled relative to one another.

The pickup area is not a separate canonical layout source.
It is a projection surface driven from the same canonical PulseCell definitions.

---

## 4. One renderer, multiple projections

The Studio should use one common renderer contract, with multiple projection modes.

### Projection modes

#### A. Editor preview projection
Used while selecting rows/columns and start/span.

#### B. Pickup projection
Used for perceptual confirmation of multiple PulseCells together.

#### C. Scene/runtime projection
Used for the normal rendered stage.

#### D. Focus projection
Used when a PulseCell takes over the full available area.

The important design rule is:

> projection mode may differ, but canonical cell meaning must not differ

So the same PulseCell definition should be renderable through all four modes.

---

## 5. Shared rendering discipline

The Studio should adopt one rendering pipeline.

### 5.1 Pipeline

1. determine layout area
2. divide layout area using `viewport.rows` and `viewport.columns`
3. compute PulseCell rectangle from `startCell` and `span`
4. render Pulse head/body
5. render PulseField content within body
6. attach interaction behavior

This same order should apply in the pickup area too.

### 5.2 Consequence

Pickup confirmation must not use ad hoc math unrelated to the main renderer.
Instead, it should call the same geometry resolution logic with a different surface rectangle.

This is the central unification.

---

## 6. Layout first, then geometry

This should be stated explicitly in the Studio architecture.

### Rule

Geometry must be computed only after the target rendering surface has a settled size.

Therefore:
- stage layout must resolve first
- pickup frame layout must resolve first
- only then should cell rectangles be computed

This avoids a drift where a valid canonical Pulse disappears simply because the stage width was measured too early.

### Practical implication

The Studio renderer should use a layout-stable measurement discipline such as:
- `ResizeObserver`
- or frame-stable measurement after layout settlement

This applies equally to:
- side-by-side editor/render view
- single-column mobile simulation
- pickup confirmation frame
- full-screen focus mode

---

## 7. Proposed Studio modules

### 7.1 PulseCell Editor

Responsibilities:
- edit pulse phrase
- edit layer
- edit response convention
- edit response body
- edit viewport rows/columns
- mark `startCell` and `span`
- generate canonical JSON

### 7.2 PulseField Editor

Responsibilities:
- define field-oriented rendering behavior inside the Pulse body
- map response sections to named fields
- preview field rendering within the Pulse body
- support structured form/list/table-like render hints

### 7.3 Pickup Confirmation Panel

Responsibilities:
- render selected PulseCells together
- use same renderer geometry discipline
- allow guide overlays on/off
- allow focus takeover on tap
- confirm perceptual coexistence of pulses

### 7.4 Scene JSON Panel

Responsibilities:
- show combined canonical JSON for scene/cells
- support direct editing
- validate schema
- roundtrip with editors and renderer

### 7.5 Common Renderer Engine

Responsibilities:
- resolve layout area
- compute rectangles from viewport/start/span
- render Pulse shell
- render PulseField body
- support projection modes
- support full takeover interaction

---

## 8. Studio UI layout

A useful Studio layout could be:

### Left side
- PulseCell editor
- PulseField editor
- canonical JSON

### Right side
- pickup confirmation panel
- main rendered scene panel
- optional focus overlay preview

The editor and renderer may be side-by-side on large screens and stacked on narrow ones.

---

## 9. Canonical data layers

The Studio should distinguish three data layers.

### 9.1 Canonical scene data
Persisted and shareable.
Contains:
- PulseCells
- response data
- viewport rows/columns
- layer
- positions
- render hints

### 9.2 Studio-only preview data
Not canonical.
Contains:
- preview width/height
- pickup frame preset
- guide visibility
- editor state
- current selection rectangle

### 9.3 Derived render state
Never persisted as canonical.
Contains:
- computed pixel rectangles
- field layout results
- focus overlay state
- measured stage sizes

This separation is important so that preview convenience does not pollute canonical Pulse definitions.

---

## 10. Pickup confirmation model

The pickup panel should follow this rule:

> use the same cell geometry rule as the main renderer, but with the pickup frame as the target area

That means:
- pickup frame has a fixed visible size
- each PulseCell uses that fixed area as the rendering surface
- the pickup renderer divides that area using the pulse’s own viewport row/column counts
- `startCell` and `span` determine the placement box

An optional hybrid perceptual mode may show:
- dotted placement guide
- solid perceptual box preserving preview shape

This should be a visible Studio option, not hidden behavior.

---

## 11. Perceptive UI interaction model

The Studio should help explain the perceptive UI approach.

### Overview mode
- many PulseCells visible together
- not all content needs to be fully readable
- pulses act as perceptual presences

### Focus mode
- tapping a PulseCell lets it occupy the full available area
- same Pulse definition, different projection mode

### Principle

> interaction changes projection, not identity

This is a key perceptive UI idea.

The Studio should demonstrate this directly:
- show compact pickup/scene presence
- tap to focus
- tap close to return

---

## 12. PulseField integration

PulseField rendering must be part of the same renderer, not an afterthought.

The Studio should let a designer:
- map structured response rows to named fields
- define field ordering and body behavior
- preview how fields render inside the Pulse body
- verify that structured responses remain consistent under resized stage conditions

This is especially important for forms such as:
- bank account details
- notification preferences
- profile entry

---

## 13. Validation rules

The Studio should validate at three levels.

### 13.1 Canonical schema validation
- required properties present
- viewport rows/columns positive
- span positive
- layer valid
- response convention valid

### 13.2 Geometric validity
- `startCell` inside viewport
- `span` inside viewport bounds
- `startCell + span - 1` does not exceed viewport rows/columns

### 13.3 Render-surface validity
- target stage or pickup frame has non-zero size
- measurement occurs after layout stabilization

This third level is crucial. It prevents valid canonical Pulses from becoming invisible because the surface was measured too early.

---

## 14. Suggested render contract

A shared renderer function should conceptually accept:

```text
renderPulse(surfaceRect, pulse, projectionMode)
```

Where:
- `surfaceRect` = resolved target pixel area
- `pulse` = canonical PulseCell definition
- `projectionMode` = editor | pickup | scene | focus

Then all geometric derivation happens from the same canonical source.

This makes the Studio coherent and keeps pickup and main scene aligned.

---

## 15. Recommended implementation milestones

### Milestone 1
Stabilize canonical PulseCell schema.

### Milestone 2
Implement one common geometry resolver from:
- surface rectangle
- viewport rows/columns
- startCell
- span

### Milestone 3
Use that resolver in:
- scene renderer
- pickup renderer
- focus renderer

### Milestone 4
Add PulseField editor and field renderer confirmation.

### Milestone 5
Add interaction explanation layer:
- guide toggle
- focus takeover
- overview/focus transitions

### Milestone 6
Write the consolidated perceptive UI note directly from Studio behavior.

---

## 16. Main design claim

GridLookoutPulse Studio is not just a JSON editor plus preview pane.
It is a unified authoring and confirmation environment where:
- canonical Pulse semantics are authored once
- placement is confirmed perceptually
- rendering uses one shared geometry discipline
- interaction demonstrates perceptive UI directly

In short:

> one canonical Pulse definition, many projections, one rendering discipline

---

## 17. Short definition

GridLookoutPulse Studio is an integrated facility for:
- defining PulseCells and PulseFields canonically
- confirming placement perceptually in a pickup surface
- rendering and interacting with the same definitions using a common layout-first geometry pipeline.



# For ANDROID Platform


The principle is shared, but the mechanism must be solved separately per platform.

What is shared

Across web and Android native, the same conceptual rule should hold:

layout first, then geometry

Meaning:

first know the actual available render area
then divide it by viewport rows/columns
then compute startCell / span
then render

That part is platform-independent.

What is platform-specific

The way you know that layout is “ready” is different.

On web

You used:

requestAnimationFrame
possibly ResizeObserver

because browser layout settles asynchronously.

On Android native

You will need Android-native equivalents, such as:

waiting until a View has been measured
using layout callbacks
reacting to size changes through Android view lifecycle hooks

So yes, the same issue exists, but it appears through a different platform mechanism.

The right way to think about it

Do not think:

“web fix here, Android fix there”

Think:

common rendering contract
platform-specific layout readiness adapter

So the architecture should be:

Common logic
canonical PulseCell schema
CGP math
rectFromCGP(rows, cols, startCell, span, width, height)
Platform-specific adapter
web: knows when DOM stage size is stable
Android: knows when native View size is stable

Then both call the same geometry logic.

For Android native GridLookout

You will need the equivalent of:

obtain actual measured width/height of the container
only after that, compute cell rectangles
rerender when the container size changes

That is the Android version of the same discipline.

Strong formulation

The geometry problem is universal; the layout-readiness trigger is platform-specific.

That is probably the cleanest sentence.

What this implies for GridLookoutPulse Studio

Studio should eventually define two layers:

1. Platform-neutral geometry contract
viewport rows/columns
layer
startCell
span
field layout rules
2. Platform renderer adapter
Web adapter
Android adapter
later iOS / desktop adapter

That way the bugs you hit on web become lessons for Android, not duplicated confusion.

Recommendation

Yes — you should expect to solve the layout-ready → geometry step separately in Android native GridLookout, but using the same core rule and the same canonical pulse geometry.