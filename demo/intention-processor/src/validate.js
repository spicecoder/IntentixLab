import path from 'node:path';
import { ensureOutputContract } from './signal.js';

export async function validateDN({ dnFile, sampleInput, outgoingSignal }) {
  const mod = await import(`${path.resolve(dnFile)}?v=${Date.now()}`);
  if (typeof mod.perform !== 'function') {
    throw new Error('Generated DN must export async function perform(signal).');
  }
  const output = await mod.perform(sampleInput);
  ensureOutputContract(output, outgoingSignal);
  return output;
}
