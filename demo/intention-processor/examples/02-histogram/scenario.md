Generate a Node.js Design Node that creates an SVG histogram.

Rules:
- Read numeric values from the `histogram_data` Pulse response array.
- Responses may include a META row such as ["META", "value"]. Ignore META rows.
- Emit a `histogram_svg` Pulse containing one SVG string.
- Emit a `histogram_summary` Pulse containing JSON with count, min and max.
- Return exactly the designated outgoing Signal shape.
