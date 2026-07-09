import { validateDN } from './validate.js';
import { printSignalSummary, printStage } from './console-ui.js';

export class IntentionContainer {
  constructor({ name = 'Intention Container' } = {}) {
    this.name = name;
  }

  async run({ dnName, dnFile, incomingSignal, outgoingSignal }) {
    printStage(this.name, [
      `Runtime agency : hosts generated Design Node`,
      `Design Node    : ${dnName}`,
      `Signal flow    : ${incomingSignal.signalId} → ${dnName} → ${outgoingSignal.signalId}`
    ]);
    printSignalSummary('Runtime Incoming Signal', incomingSignal);
    const output = await validateDN({ dnFile, sampleInput: incomingSignal, outgoingSignal });
    printSignalSummary('Runtime Outgoing Signal', output);
    return output;
  }
}
