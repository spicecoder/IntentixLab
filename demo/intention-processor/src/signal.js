export function getPulse(signal, phrase) {
  return signal.pulses.find((pulse) => pulse.phrase === phrase);
}

export function latestResponse(signal, phrase, fallback = '') {
  const pulse = getPulse(signal, phrase);
  if (!pulse || !Array.isArray(pulse.responses) || pulse.responses.length === 0) return fallback;
  const value = pulse.responses[pulse.responses.length - 1];
  return Array.isArray(value) ? value[value.length - 1] : value;
}

export function ensureOutputContract(outputSignal, outputTemplate) {
  const errors = [];
  if (outputSignal.intentionId !== outputTemplate.intentionId) {
    errors.push(`Expected intentionId ${outputTemplate.intentionId}, received ${outputSignal.intentionId}`);
  }
  for (const required of outputTemplate.pulses) {
    if (!outputSignal.pulses.some((pulse) => pulse.phrase === required.phrase)) {
      errors.push(`Missing output pulse: ${required.phrase}`);
    }
  }
  if (errors.length) {
    throw new Error(errors.join('\n'));
  }
}
