import http from 'http';
import assert from 'assert';

const server = http.createServer((req, res) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    assert.strictEqual(req.headers['authorization'], 'Bearer cle');
    assert.strictEqual(req.headers['http-referer'], 'test-ref');
    assert.strictEqual(req.headers['x-title'], 'test-title');
    const parsed = JSON.parse(body);
    assert.deepStrictEqual(parsed, { model: 'kimi/k2v', messages: [] });
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ choices: [{ message: { content: 'ok' } }] }));
  });
});

await new Promise(resolve => server.listen(0, resolve));
const { port } = server.address();
process.env.OPENROUTER_BASE_URL = `http://localhost:${port}`;
process.env.OPENROUTER_API_KEY = 'cle';
process.env.APP_REFERER = 'test-ref';
process.env.APP_TITLE = 'test-title';

const { chatCompletion } = await import('../openrouter.js');
const response = await chatCompletion({ model: 'kimi/k2v', messages: [] });
assert.strictEqual(response.choices[0].message.content, 'ok');

server.close();
console.log('openrouter integration: OK');
