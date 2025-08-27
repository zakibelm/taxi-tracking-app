import assert from 'assert';
import fs from 'fs';
import { loadConfig, saveConfig } from '../config.js';

fs.rmSync('data/config.json', { force: true });
const cfg = loadConfig();
assert.ok(Array.isArray(cfg.agents), 'agents should be array');

cfg.agents[0].name = 'Test';
saveConfig(cfg);
const cfg2 = loadConfig();
assert.strictEqual(cfg2.agents[0].name, 'Test');

console.log('config load/save: OK');
