const test = require('node:test');
const assert = require('node:assert/strict');

// Mocked test verifying request to OpenRouter is well formed.
// No real network call is performed so tests pass offline.

const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';

function buildHeaders(apiKey) {
  return {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': process.env.APP_REFERER || 'http://localhost',
    'X-Title': process.env.APP_TITLE || 'Jarvis Test',
  };
}

test('forms request for Kimi k2v model', async (t) => {
  const apiKey = 'test-key';
  process.env.OPENROUTER_API_KEY = apiKey;

  const calls = [];
  t.mock.method(global, 'fetch', async (url, options) => {
    calls.push({ url, options });
    return {
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'pong' } }],
      }),
    };
  });

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: buildHeaders(apiKey),
    body: JSON.stringify({
      model: 'kimi/k2v',
      messages: [{ role: 'user', content: 'ping' }],
      max_tokens: 10,
    }),
  });

  assert.ok(res.ok, 'Request failed');
  const data = await res.json();
  assert.strictEqual(data.choices[0].message.content, 'pong');

  assert.strictEqual(calls.length, 1);
  assert.strictEqual(calls[0].url, apiUrl);
  assert.strictEqual(
    calls[0].options.headers.Authorization,
    `Bearer ${apiKey}`
  );
});
