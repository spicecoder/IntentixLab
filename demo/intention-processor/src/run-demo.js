import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { readJSON, repoPath, writeText } from './io.js';
import { IntentionContainer } from './IntentionContainer.js';
import { box, latestPulseValue, printSignalSummary, printStage } from './console-ui.js';

const CONFIG = {
  login: {
    dnName: 'DN_Login',
    sample: 'specs/login/sample-input-signal.json',
    incoming: 'specs/login/incoming-signal.json',
    out: 'specs/login/outgoing-signal.json'
  },
  histogram: {
    dnName: 'DN_Histogram',
    sample: 'specs/histogram/sample-input-signal.json',
    incoming: 'specs/histogram/incoming-signal.json',
    out: 'specs/histogram/outgoing-signal.json'
  }
};

function maybeOpenFile(filePath) {
  if (process.env.DEMO_OPEN_HISTOGRAM === '0') return;
  if (process.platform !== 'darwin') return;
  if (!existsSync(filePath)) return;
  const res = spawnSync('open', [filePath], { stdio: 'ignore' });
  if (res.status !== 0) {
    console.log(`Open manually: ${filePath}`);
  }
}

async function persistHistogramSvg(output, label = 'histogram') {
  const svg = latestPulseValue(output, 'histogram_svg');
  if (!svg) return null;
  const filePath = repoPath('generated/artifacts', `${label}.svg`);
  await writeText(filePath, svg);
  return filePath;
}

function printLoginResult(output) {
  const authenticated = latestPulseValue(output, 'authenticated') === 'true';
  const userId = latestPulseValue(output, 'user_id', 'unknown');
  const message = latestPulseValue(output, 'user_message', authenticated ? 'Login successful.' : 'Login failed.');

  box(authenticated ? '✅ LOGIN SUCCESS' : '❌ LOGIN FAILED', [
    `Signal emitted : ${output.signalId}`,
    `User          : ${userId}`,
    `Message       : ${message}`
  ]);
}

async function printHistogramResult(output, label = 'histogram-generated') {
  const summary = latestPulseValue(output, 'histogram_summary', '{}');
  const svgPath = await persistHistogramSvg(output, label);
  box('📊 HISTOGRAM GENERATED', [
    `Signal emitted : ${output.signalId}`,
    `Summary        : ${summary}`,
    svgPath ? `SVG written    : ${svgPath}` : 'SVG written    : not found in output Signal'
  ]);
  if (svgPath) {
    if (process.env.DEMO_OPEN_HISTOGRAM === '0') {
      console.log('Histogram SVG preview auto-open disabled.');
    } else {
      console.log('Opening histogram SVG for recording preview...');
    }
    maybeOpenFile(svgPath);
  }
  return svgPath;
}

export async function testDN(kind) {
  const cfg = CONFIG[kind];
  if (!cfg) throw new Error(`Unknown test target: ${kind}`);
  const dnFile = repoPath('generated/dns', `${cfg.dnName}.js`);
  const sampleInput = await readJSON(repoPath(cfg.sample));
  const incomingContract = await readJSON(repoPath(cfg.incoming));
  const outgoingSignal = await readJSON(repoPath(cfg.out));

  printStage('Runtime Test', [
    'Generated DN is now placed in an Intention Container.',
    'The container orchestrates incoming and outgoing Signals.',
    `${sampleInput.signalId} → ${cfg.dnName} → ${outgoingSignal.signalId}`
  ]);
  printSignalSummary('Designated Incoming Signal Contract', incomingContract);
  printSignalSummary('Designated Outgoing Signal Contract', outgoingSignal);

  const container = new IntentionContainer({ name: 'Intention Container Runtime' });
  const output = await container.run({
    dnName: cfg.dnName,
    dnFile,
    incomingSignal: sampleInput,
    outgoingSignal
  });

  if (kind === 'login') {
    printLoginResult(output);
  } else if (kind === 'histogram') {
    await printHistogramResult(output);
  }

  console.log('\nOutput Signal');
  console.log(JSON.stringify(output, null, 2));
}

export async function composeAuthenticatedHistogram() {
  printStage('Composition Runtime', [
    'No new monolithic DN is generated here.',
    'Two generated DNs are composed through explicit Signals.',
    'DN_Login emits authenticated context for DN_Histogram.'
  ]);

  const loginSample = await readJSON(repoPath('specs/login/sample-input-signal.json'));
  const loginOutTemplate = await readJSON(repoPath('specs/login/outgoing-signal.json'));
  const histInput = await readJSON(repoPath('specs/histogram/sample-input-signal.json'));
  const histOutTemplate = await readJSON(repoPath('specs/histogram/outgoing-signal.json'));

  printSignalSummary('Composition Input Signal A', loginSample);
  printSignalSummary('Composition Input Signal B', histInput);

  const container = new IntentionContainer({ name: 'Intention Container Runtime' });
  const loginOutput = await container.run({
    dnName: 'DN_Login',
    dnFile: repoPath('generated/dns/DN_Login.js'),
    incomingSignal: loginSample,
    outgoingSignal: loginOutTemplate
  });

  printLoginResult(loginOutput);

  const enrichedHistogramInput = {
    ...histInput,
    signalId: 'S_authenticated_histogram_request',
    intentionId: 'I_generate_authenticated_histogram',
    pulses: [
      ...loginOutput.pulses,
      ...histInput.pulses
    ]
  };

  printSignalSummary('Composed Histogram Input Signal', enrichedHistogramInput);

  const histogramOutput = await container.run({
    dnName: 'DN_Histogram',
    dnFile: repoPath('generated/dns/DN_Histogram.js'),
    incomingSignal: enrichedHistogramInput,
    outgoingSignal: histOutTemplate
  });

  const svgPath = await printHistogramResult(histogramOutput, 'authenticated-histogram-generated');

  console.log('');
  console.log('DN_Login');
  console.log('  ↓');
  console.log(`${loginOutput.signalId}`);
  console.log('  +');
  console.log(`${histInput.signalId}`);
  console.log('  ↓');
  console.log('DN_Histogram');
  console.log('  ↓');
  console.log(`${histogramOutput.signalId}`);
  console.log('');

  box('✅ COMPOSITION COMPLETE', [
    'Login Signal authenticated the context.',
    'Histogram Signal was realised inside that context.',
    'Composition happened through Signals, not direct DN coupling.',
    svgPath ? `SVG written: ${svgPath}` : 'SVG written: not found in output Signal'
  ]);

  console.log('');
  console.log(JSON.stringify({
    authenticatedSignal: loginOutput,
    composedInput: enrichedHistogramInput,
    histogramResult: histogramOutput
  }, null, 2));
}
