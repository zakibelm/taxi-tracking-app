# Jarvis Docker Suite

Projet de démonstration combinant un agent HTTP Node.js et une interface web Next.js pour piloter quatre sous‑agents IA via [OpenRouter](https://openrouter.ai/).

## Prérequis

- Docker >= 24
- docker compose

## Variables d'environnement

### Agent
- `PORT=3001`
- `UI_ORIGIN=http://localhost:3000`
- `OPENROUTER_BASE_URL=https://openrouter.ai/api/v1`
- `OPENROUTER_API_KEY` (dev) ou `OPENROUTER_API_KEY_FILE=/run/secrets/openrouter_api_key` (prod)
- `APP_TITLE=Jarvis Agent`
- `APP_REFERER=https://jarvis.local`

### UI
- `NEXT_PUBLIC_AGENT_BASE=http://localhost:3001`
- `NEXT_PUBLIC_TITLE=Jarvis`

## Lancement

```bash
docker compose up --build
```

Une fois les services démarrés :
- `http://localhost:3001/health` → `{ "status": "ok" }`
- `http://localhost:3000` → interface Jarvis (Chat et Admin)

## Tests rapides

```bash
curl -s http://localhost:3001/health
```

## Notes de sécurité

- La clé OpenRouter est stockée côté serveur dans un fichier de secret et n'est jamais exposée au client.
- Les routes sont soumises à un rate‑limit basique.
