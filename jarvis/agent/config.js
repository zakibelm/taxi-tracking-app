import fs from 'fs';
import path from 'path';

const dataDir = path.resolve('data');
const configFile = path.join(dataDir, 'config.json');
const agentsFile = new URL('./agents.json', import.meta.url);

export function loadConfig() {
  try {
    const raw = fs.readFileSync(configFile, 'utf-8');
    return JSON.parse(raw);
  } catch {
    const agents = JSON.parse(fs.readFileSync(agentsFile, 'utf-8'));
    return { agents };
  }
}

export function saveConfig(cfg) {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(configFile, JSON.stringify(cfg, null, 2));
}
