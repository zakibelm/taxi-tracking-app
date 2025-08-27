import fs from 'fs';

const BASE_URL = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';

export async function chatCompletion(payload) {
  const apiKey = getApiKey();
  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': process.env.APP_REFERER || '',
      'X-Title': process.env.APP_TITLE || ''
    },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export function getApiKey() {
  if (process.env.OPENROUTER_API_KEY) return process.env.OPENROUTER_API_KEY.trim();
  const file = process.env.OPENROUTER_API_KEY_FILE || 'data/.openrouter_api_key';
  try {
    return fs.readFileSync(file, 'utf-8').trim();
  } catch {
    return '';
  }
}
