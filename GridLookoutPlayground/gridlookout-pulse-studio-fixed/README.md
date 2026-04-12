# GridLookout Pulse Studio Foundation

This foundation sets up the Studio around one shared rule:

**layout first, then geometry**

What is included:
- canonical scene JSON editing
- scene projection and pickup projection
- one common renderer path for both surfaces
- `ResizeObserver` based measurement so geometry is computed only after layout is stable
- Pulse inspector
- simple pickup accumulation flow
- focus overlay on pulse click

## Run locally

```bash
cd gridlookout-pulse-studio-foundation
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Current scope

This is a foundation, not the full Studio.
It gives you the stable rendering spine needed for:
- PulseCell editor refinement
- PulseField editor refinement
- perceptive placement confirmation
- later pickup-grid authoring tools
- later JSON/schema roundtrip improvements
