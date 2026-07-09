import { callOllama } from './ollama.js';

export function providerLabel() {
  const provider = (process.env.LLM_PROVIDER || 'ollama').toLowerCase();
  if (provider === 'none' || provider === 'fallback') return 'fallback';
  if (provider === 'openai') return `openai:${process.env.OPENAI_MODEL || 'gpt-4.1-mini'}`;
  return `ollama:${process.env.OLLAMA_MODEL || 'gemma4'}`;
}

export async function callLLM(prompt) {
  const provider = (process.env.LLM_PROVIDER || 'ollama').toLowerCase();
  if (provider === 'none' || provider === 'fallback') {
    throw new Error('LLM_PROVIDER=none requested deterministic fallback generation.');
  }
  if (provider === 'openai') return callOpenAI(prompt);
  if (provider === 'ollama') return callOllama(prompt, { model: process.env.OLLAMA_MODEL || 'gemma4' });
  throw new Error(`Unsupported LLM_PROVIDER: ${provider}`);
}

async function callOpenAI(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is required when LLM_PROVIDER=openai.');
  const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: 'system',
          content: 'Return only JavaScript source code. Do not include markdown fences or explanation.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.1
    })
  });
  if (!response.ok) {
    throw new Error(`OpenAI request failed: ${response.status} ${await response.text()}`);
  }
  const data = await response.json();
  if (typeof data.output_text === 'string' && data.output_text.trim()) return data.output_text;
  const text = data.output
    ?.flatMap(item => item.content || [])
    ?.map(part => part.text || '')
    ?.join('\n')
    ?.trim();
  if (!text) throw new Error('OpenAI response did not contain text output.');
  return text;
}
