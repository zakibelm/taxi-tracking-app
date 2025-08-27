import fs from 'fs';
import assert from 'assert';
import { getApiKey } from '../openrouter.js';

// test env variable has priority
process.env.OPENROUTER_API_KEY = 'cle-env';
assert.strictEqual(getApiKey(), 'cle-env');

// test file fallback
delete process.env.OPENROUTER_API_KEY;
fs.mkdirSync('data', { recursive: true });
fs.writeFileSync('data/.key_test', 'cle-fichier');
process.env.OPENROUTER_API_KEY_FILE = 'data/.key_test';
assert.strictEqual(getApiKey(), 'cle-fichier');

console.log('openrouter getApiKey: OK');
