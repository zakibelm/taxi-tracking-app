# API Jarvis Agent (extrait)

- `GET /health` → `{ "status": "ok" }`
- `GET /agents` → liste des agents sans secrets
- `GET /config` → configuration courante (sans clé)
- `POST /config` → met à jour la configuration et la clé OpenRouter
- `POST /chat` → proxy vers OpenRouter avec injection du prompt système
- `GET /mcp/tools` → `{"tools":[]}` (placeholder)
