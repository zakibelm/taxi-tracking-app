import express from 'express';
import cors from 'cors';
import { loadConfig, saveConfig } from './config.js';
import { chatCompletion } from './openrouter.js';
import { security } from './security.js';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;
const UI_ORIGIN = process.env.UI_ORIGIN || 'http://localhost:3000';

app.use(express.json({ limit: '1mb' }));
app.use(cors({ origin: UI_ORIGIN }));
security(app);

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

app.get('/agents', (_, res) => {
  const cfg = loadConfig();
  res.json(cfg.agents);
});

app.get('/config', (_, res) => {
  const cfg = loadConfig();
  res.json({ agents: cfg.agents });
});

app.post('/config', (req, res) => {
  const cfg = loadConfig();
  if (req.body.agents) cfg.agents = req.body.agents;
  saveConfig(cfg);
  if (req.body.apiKey) {
    const file = process.env.OPENROUTER_API_KEY_FILE || 'data/.openrouter_api_key';
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, req.body.apiKey.trim());
  }
  res.json({ ok: true });
});

app.post('/chat', async (req, res) => {
  try {
    const cfg = loadConfig();
    const agent = cfg.agents.find(a => a.id === req.body.agentId);
    if (!agent) return res.status(400).json({ error: 'unknown agent' });
    const messages = [{ role: 'system', content: agent.system }, ...req.body.messages];
    const data = await chatCompletion({ model: agent.model, messages, temperature: agent.temperature, max_tokens: agent.max_tokens });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'openrouter error' });
  }
});

app.get('/mcp/tools', (_, res) => {
  res.json({ tools: [] });
});

app.listen(PORT, () => {
  console.log(`agent listening on ${PORT}`);
});
