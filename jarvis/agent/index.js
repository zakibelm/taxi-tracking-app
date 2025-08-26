const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const { applySecurity } = require('./security');
const { loadConfig, saveConfig } = require('./config');
const { configUpdateSchema, chatSchema } = require('./validation');
const { callOpenRouter } = require('./openrouter');

const PORT = process.env.PORT || 3001;
const UI_ORIGIN = process.env.UI_ORIGIN || 'http://localhost:3000';

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(cors({ origin: UI_ORIGIN }));
applySecurity(app);

let configCache;
(async () => { configCache = await loadConfig(); })();

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/agents', (req, res) => {
  res.json(configCache.agents.map(a => ({
    id: a.id,
    name: a.name,
    model: a.model,
    temperature: a.temperature,
    max_tokens: a.max_tokens
  })));
});

app.get('/config', (req, res) => {
  res.json({ agents: configCache.agents });
});

app.post('/config', async (req, res) => {
  try {
    const body = configUpdateSchema.parse(req.body);
    if (body.agents) configCache.agents = body.agents;
    await saveConfig(configCache);
    if (body.apiKey) {
      const file = process.env.OPENROUTER_API_KEY_FILE || path.join('data', '.openrouter_api_key');
      await fs.mkdir(path.dirname(file), { recursive: true });
      await fs.writeFile(file, body.apiKey, { mode: 0o600 });
    }
    res.json({ ok: true, agents: configCache.agents });
  } catch (err) {
    res.status(400).json({ error: 'invalid-config', details: err.message });
  }
});

app.post('/chat', async (req, res) => {
  try {
    const body = chatSchema.parse(req.body);
    const agent = configCache.agents.find(a => a.id === body.agentId);
    if (!agent) return res.status(400).json({ error: 'unknown-agent' });
    const payload = {
      model: agent.model,
      messages: [{ role: 'system', content: agent.system }, ...body.messages],
      temperature: body.temperature ?? agent.temperature,
      max_tokens: body.max_tokens ?? agent.max_tokens
    };
    const data = await callOpenRouter(payload);
    const content = data.choices?.[0]?.message?.content || '';
    res.json({ content });
  } catch (err) {
    const status = err.message === 'missing-api-key' ? 500 : 400;
    res.status(status).json({ error: err.message });
  }
});

app.get('/mcp/tools', (req, res) => {
  res.json({ tools: [] });
});

app.listen(PORT, () => {
  console.log(`Agent démarré sur le port ${PORT}`);
});
