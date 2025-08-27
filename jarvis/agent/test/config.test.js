import { loadConfig, saveConfig } from '../config.js';
import { getApiKey } from '../openrouter.js';
const cfg = loadConfig();
if (!Array.isArray(cfg.agents)) throw new Error('agents missing');
saveConfig(cfg);
console.log('api key:', getApiKey());
