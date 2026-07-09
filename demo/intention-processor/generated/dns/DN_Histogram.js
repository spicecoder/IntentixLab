export async function perform(signal) {
  const pulse = signal.pulses.find((p) => p.phrase === 'histogram_data');
  const responses = pulse?.responses || [];
  const values = responses
    .filter((row) => !(Array.isArray(row) && row[0] === 'META'))
    .map((row) => Number(Array.isArray(row) ? row[0] : row))
    .filter((n) => Number.isFinite(n));

  const titlePulse = signal.pulses.find((p) => p.phrase === 'chart_title');
  const title = titlePulse?.responses?.[0] || 'Histogram';
  const width = 640;
  const height = 360;
  const margin = 40;
  const max = Math.max(...values, 1);
  const barWidth = (width - margin * 2) / Math.max(values.length, 1);

  const bars = values.map((value, index) => {
    const barHeight = ((height - margin * 2) * value) / max;
    const x = margin + index * barWidth;
    const y = height - margin - barHeight;
    return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${Math.max(4, barWidth - 4).toFixed(1)}" height="${barHeight.toFixed(1)}" rx="4" />`;
  }).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><style>rect{fill:#58a6ff}text{font-family:Arial,sans-serif;fill:#e6edf3}</style><rect x="0" y="0" width="${width}" height="${height}" fill="#0d1117"/> <text x="${margin}" y="28" font-size="20">${title}</text><g>${bars}</g></svg>`;

  return {
    signalId: 'S_histogram_generated',
    intentionId: 'I_histogram_generated',
    pulses: [
      { phrase: 'histogram_svg', tv: 'N', responses: [svg] },
      { phrase: 'histogram_summary', tv: 'N', responses: [JSON.stringify({ count: values.length, min: Math.min(...values), max: Math.max(...values) })] }
    ]
  };
}
