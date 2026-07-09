export function box(title, lines = []) {
  const cleanLines = lines.map((line) => String(line));
  const width = Math.max(String(title).length, ...cleanLines.map((line) => line.length), 42) + 4;
  const top = `┌${'─'.repeat(width)}┐`;
  const bottom = `└${'─'.repeat(width)}┘`;
  const row = (value = '') => `│  ${String(value).padEnd(width - 2)}│`;
  console.log(top);
  console.log(row(title));
  if (cleanLines.length) console.log(row(''));
  for (const line of cleanLines) console.log(row(line));
  console.log(bottom);
}

export function printSignalSummary(label, signal) {
  const pulses = signal.pulses || [];
  box(label, [
    `Signal    : ${signal.signalId}`,
    `Intention : ${signal.intentionId}`,
    `Pulses    : ${pulses.map((p) => p.phrase).join(', ') || '(none)'}`
  ]);
}

export function printStage(title, lines = []) {
  box(title, lines);
}

export function latestPulseValue(signal, phrase, fallback = '') {
  const pulse = signal.pulses?.find((p) => p.phrase === phrase);
  if (!pulse || !pulse.responses?.length) return fallback;
  const value = pulse.responses[pulse.responses.length - 1];
  return Array.isArray(value) ? value[value.length - 1] : value;
}
