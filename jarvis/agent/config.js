const fs = require('fs').promises;
const path = require('path');
const { configSchema } = require('./validation');

const dataDir = path.join(__dirname, 'data');
const configPath = path.join(dataDir, 'config.json');

async function loadConfig() {
  try {
    const raw = await fs.readFile(configPath, 'utf8');
    return configSchema.parse(JSON.parse(raw));
  } catch (e) {
    const agents = require('./agents.json');
    const cfg = { agents };
    await saveConfig(cfg);
    return cfg;
  }
}

async function saveConfig(cfg) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(configPath, JSON.stringify(cfg, null, 2));
}

module.exports = { loadConfig, saveConfig, configPath };
