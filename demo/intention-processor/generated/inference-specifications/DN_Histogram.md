# Inference Specification: DN_Histogram

You are composing a Design Node for Intention Space.

A Design Node is a bounded computational agency. It receives exactly one Signal and emits exactly one Signal.

The inference boundary is determined entirely by the designated incoming Signal and designated outgoing Signal.

You are not permitted to invent additional semantic interfaces.

Your responsibility is to infer only the algorithm that transforms one bounded situational reality into the other.

## Target Runtime

Node.js, ES module.

## Required Export

Return only JavaScript source code. Do not include markdown fences.

The module must export:

async function perform(signal) { ... }

## Scenario

Generate a Node.js Design Node that creates an SVG histogram.

Rules:
- Read numeric values from the `histogram_data` Pulse response array.
- Responses may include a META row such as ["META", "value"]. Ignore META rows.
- Emit a `histogram_svg` Pulse containing one SVG string.
- Emit a `histogram_summary` Pulse containing JSON with count, min and max.
- Return exactly the designated outgoing Signal shape.

## Designated Incoming Signal

```json
{
  "signalId": "S_generate_histogram",
  "intentionId": "I_generate_histogram",
  "pulses": [
    {
      "phrase": "_perception_mode",
      "tv": "Y",
      "responses": [
        "act"
      ]
    },
    {
      "phrase": "histogram_data",
      "tv": "Y",
      "responses": [
        [
          "META",
          "value"
        ],
        [
          "10"
        ],
        [
          "14"
        ],
        [
          "15"
        ],
        [
          "18"
        ],
        [
          "18"
        ],
        [
          "20"
        ],
        [
          "22"
        ],
        [
          "24"
        ],
        [
          "26"
        ],
        [
          "30"
        ]
      ]
    },
    {
      "phrase": "chart_title",
      "tv": "Y",
      "responses": [
        "Demo Histogram"
      ]
    }
  ]
}
```

## Designated Outgoing Signal

```json
{
  "signalId": "S_histogram_generated",
  "intentionId": "I_histogram_generated",
  "pulses": [
    {
      "phrase": "histogram_svg",
      "tv": "N",
      "responses": []
    },
    {
      "phrase": "histogram_summary",
      "tv": "N",
      "responses": []
    }
  ]
}
```

## Hard Requirements

1. Export exactly an async function named perform.
2. Accept one argument named signal.
3. Return a Signal object.
4. Return signalId: S_histogram_generated
5. Return intentionId: I_histogram_generated
6. Include all required outgoing pulses.
7. Do not import external npm packages.
8. Keep code deterministic and small.
