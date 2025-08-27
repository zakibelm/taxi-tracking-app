# API OpenAPI (extrait)

- `GET /health` → `{ "status": "ok" }`
- `GET /agents` → liste des agents
- `GET /config` → configuration sans clé
- `POST /config` → met à jour la config et la clé (si fournie)
- `POST /chat` → proxifie vers OpenRouter
- `GET /mcp/tools` → `{ "tools": [] }`
