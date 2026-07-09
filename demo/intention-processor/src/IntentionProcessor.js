import './env.js';
import { buildInferenceSpec } from './inference-spec.js';
import { extractJavaScript } from './ollama.js';
import { callLLM, providerLabel } from './llm.js';
import { fallbackDNSource } from './fallback-dns.js';
import { readJSON, readText, writeText, repoPath } from './io.js';
import { validateDN } from './validate.js';
import { registerDN } from './registry.js';
import { printSignalSummary, printStage } from './console-ui.js';

const EXAMPLES = {
  login: { dir: 'examples/01-login', dnName: 'DN_Login' },
  histogram: { dir: 'examples/02-histogram', dnName: 'DN_Histogram' }
};

export class IntentionProcessor {
  constructor({ provider = providerLabel() } = {}) {
    this.provider = provider;
  }

  async generate(kind) {
    const item = EXAMPLES[kind];
    if (!item) throw new Error(`Unknown generation target: ${kind}`);

    printStage('Intention Processor', [
      `Target Design Node : ${item.dnName}`,
      `Inference Engine   : ${this.provider}`,
      'Role               : design-time DN generation'
    ]);

    console.log(`[1] Loading ${kind} scenario... ✓`);
    const scenario = await readText(repoPath(item.dir, 'scenario.md'));
    console.log('[2] Loading designated incoming Signal... ✓');
    const incomingSignal = await readJSON(repoPath(item.dir, 'incoming.signal.json'));
    printSignalSummary('Designated Incoming Signal', incomingSignal);

    console.log('[3] Loading designated outgoing Signal... ✓');
    const outgoingSignal = await readJSON(repoPath(item.dir, 'outgoing.signal.json'));
    printSignalSummary('Designated Outgoing Signal', outgoingSignal);

    printStage('Inference Specification Boundary', [
      'Boundary source : Incoming Signal + Outgoing Signal',
      'LLM freedom     : infer only the internal algorithm',
      'Not allowed     : invent extra semantic interfaces'
    ]);

    console.log('[4] Building Inference Specification... ✓');
    const spec = buildInferenceSpec({ dnName: item.dnName, scenario, incomingSignal, outgoingSignal });
    const specPath = repoPath('generated/inference-specifications', `${item.dnName}.md`);
    await writeText(specPath, spec);
    console.log(`    wrote ${specPath}`);

    printStage('Spec + LLM → Design Node', [
      `Spec  : generated/inference-specifications/${item.dnName}.md`,
      `LLM   : ${this.provider}`,
      `Output: generated/dns/${item.dnName}.js`
    ]);

    console.log(`[5] Invoking ${this.provider}...`);
    let source = '';
    let provider = this.provider;
    try {
      const raw = await callLLM(spec);
      source = extractJavaScript(raw);
      if (!source.includes('export async function perform')) {
        throw new Error('Model response did not contain required export.');
      }
      console.log('    model returned JavaScript source ✓');
    } catch (error) {
      provider = `fallback-after-${provider}`;
      console.log(`    model generation issue: ${error.message}`);
      console.log('    using deterministic human-authored fallback DN source ✓');
      source = fallbackDNSource(kind);
    }

    const dnPath = repoPath('generated/dns', `${item.dnName}.js`);
    await writeText(dnPath, source);
    console.log(`[6] Generated ${item.dnName}.js ✓`);

    console.log('[7] Validating generated DN against outgoing Signal...');
    const sampleInput = await readJSON(repoPath(item.dir, 'sample-input.signal.json'));
    const output = await validateDN({ dnFile: dnPath, sampleInput, outgoingSignal });
    console.log(`    output signal: ${output.signalId} / ${output.intentionId} ✓`);

    console.log('[8] Registering generated Design Node...');
    await registerDN({
      dnName: item.dnName,
      kind,
      provider,
      inputSignal: incomingSignal.signalId,
      outputSignal: outgoingSignal.signalId,
      source: `generated/dns/${item.dnName}.js`,
      inferenceSpec: `generated/inference-specifications/${item.dnName}.md`
    });
    console.log(`    registered ${item.dnName} ✓`);

    printStage('Generated Computational Agency', [
      `${item.dnName} is now available for runtime execution.`,
      'Runtime host: Intention Container',
      `${incomingSignal.signalId} → ${item.dnName} → ${outgoingSignal.signalId}`
    ]);

    return { dnPath, output };
  }
}

export async function generate(kind) {
  return new IntentionProcessor().generate(kind);
}
