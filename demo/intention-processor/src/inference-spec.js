export function buildInferenceSpec({ dnName, scenario, incomingSignal, outgoingSignal, language = 'Node.js' }) {
  return `# Inference Specification: ${dnName}

You are composing a Design Node for Intention Space.

A Design Node is a bounded computational agency. It receives exactly one Signal and emits exactly one Signal.

The inference boundary is determined entirely by the designated incoming Signal and designated outgoing Signal.

You are not permitted to invent additional semantic interfaces.

Your responsibility is to infer only the algorithm that transforms one bounded situational reality into the other.

## Target Runtime

${language}, ES module.

## Required Export

Return only JavaScript source code. Do not include markdown fences.

The module must export:

async function perform(signal) { ... }

## Scenario

${scenario.trim()}

## Designated Incoming Signal

\`\`\`json
${JSON.stringify(incomingSignal, null, 2)}
\`\`\`

## Designated Outgoing Signal

\`\`\`json
${JSON.stringify(outgoingSignal, null, 2)}
\`\`\`

## Hard Requirements

1. Export exactly an async function named perform.
2. Accept one argument named signal.
3. Return a Signal object.
4. Return signalId: ${outgoingSignal.signalId}
5. Return intentionId: ${outgoingSignal.intentionId}
6. Include all required outgoing pulses.
7. Do not import external npm packages.
8. Keep code deterministic and small.
`;
}
