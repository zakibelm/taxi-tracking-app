const fs = require('fs').promises;
const axios = require('axios');

async function readKey() {
  if (process.env.OPENROUTER_API_KEY) return process.env.OPENROUTER_API_KEY.trim();
  const file = process.env.OPENROUTER_API_KEY_FILE || './data/.openrouter_api_key';
  try {
    return (await fs.readFile(file, 'utf8')).trim();
  } catch {
    return null;
  }
}

async function callOpenRouter(payload) {
  const key = await readKey();
  if (!key) throw new Error('missing-api-key');
  const instance = axios.create({
    baseURL: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
    timeout: 60000,
    headers: {
      Authorization: `Bearer ${key}`,
      'HTTP-Referer': process.env.APP_REFERER || '',
      'X-Title': process.env.APP_TITLE || ''
    }
  });
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await instance.post('/chat/completions', payload);
      return res.data;
    } catch (err) {
      if (attempt === 1) throw err;
    }
  }
}

module.exports = { callOpenRouter };
