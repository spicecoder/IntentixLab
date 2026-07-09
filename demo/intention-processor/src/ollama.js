export async function callOllama(prompt, { model = 'gemma4' } = {}) {
  const url = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
      options: {
        temperature: 0.1,
        top_p: 0.8
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama request failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  return data.response || '';
}

export function extractJavaScript(text) {
  const fenced = text.match(/```(?:javascript|js)?\s*([\s\S]*?)```/i);
  return (fenced ? fenced[1] : text).trim();
}
