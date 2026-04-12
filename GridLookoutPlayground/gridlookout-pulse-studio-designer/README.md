# GridLookout Pulse Studio

This build adds the missing authoring pieces on top of the working tabs/render base:

- PulseCell grid selector
- Add/update PulseCell into canonical Scene JSON
- Add selected PulseCell to pickup
- Pickup remove/reposition controls
- PulseField grid selector inside a selected PulseCell
- Add/update PulseField into the selected cell
- Scene JSON persistent on wide screens and tabbed on narrow screens

## Run

Serve the folder locally, for example:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://127.0.0.1:8080/
```

## Notes

The pickup area is a perceptive projection of the same canonical cells. Repositioning from pickup updates the same `visual.position.startCell` in Scene JSON. No separate pickup-only geometry is stored.
