'use client';

import { getSettings } from './indexeddb';

export interface LLMCallOptions {
  systemPrompt: string;
  userMessage: string;
  onProgress?: (msg: string) => void;
  onComplete?: (result: any) => void;
  onError?: (msg: string) => void;
}

export async function callLLM(options: LLMCallOptions) {
  const settings = await getSettings();
  if (!settings.llmApiKey) {
    options.onError?.('LLM API key not configured. Open Settings to add your API key.');
    return;
  }

  try {
    const response = await fetch(`${settings.llmApiUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.llmApiKey}`,
      },
      body: JSON.stringify({
        model: settings.llmModel || 'gpt-5.4-mini',
        messages: [
          { role: 'system', content: options.systemPrompt },
          { role: 'user', content: options.userMessage },
        ],
        stream: true,
        max_tokens: 4000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => 'Unknown error');
      options.onError?.(`LLM API error: ${response.status} - ${errText}`);
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      options.onError?.('No response body');
      return;
    }

    const decoder = new TextDecoder();
    let buffer = '';
    let partialRead = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      partialRead += decoder.decode(value, { stream: true });
      const lines = partialRead.split('\n');
      partialRead = lines.pop() ?? '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            try {
              const result = JSON.parse(buffer);
              options.onComplete?.(result);
            } catch {
              options.onComplete?.({ raw: buffer });
            }
            return;
          }
          try {
            const parsed = JSON.parse(data);
            const content = parsed?.choices?.[0]?.delta?.content ?? '';
            buffer += content;
            if (content) {
              options.onProgress?.('Processing...');
            }
          } catch {
            // skip
          }
        }
      }
    }

    // Fallback if no [DONE] received
    if (buffer) {
      try {
        const result = JSON.parse(buffer);
        options.onComplete?.(result);
      } catch {
        options.onComplete?.({ raw: buffer });
      }
    }
  } catch (err: any) {
    options.onError?.(err?.message ?? 'LLM call failed');
  }
}
