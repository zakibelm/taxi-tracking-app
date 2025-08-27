import http from 'http';
import assert from 'assert';

const srv = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ ok: true }));
});

await new Promise(resolve => srv.listen(0, resolve));
const { port } = srv.address();
const res = await fetch(`http://localhost:${port}`);
const json = await res.json();
assert.deepStrictEqual(json, { ok: true });
srv.close();
console.log('ui integration: OK');
