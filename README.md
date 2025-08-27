# Taxi Tracking App

Ce dépôt contient le projet **Jarvis** (agent + UI) déployable via Docker Compose.

## Prérequis
- Docker et Docker Compose

## Lancement
```bash
docker compose up --build
```

### Tests
- Vérifier l'API :
  ```bash
  curl -s http://localhost:3001/health
  ```
- UI disponible sur `http://localhost:3000`

## Variables d'environnement
Voir les fichiers `.env.example` dans les dossiers `agent` et `ui`.

## Sécurité
La clé OpenRouter doit être fournie côté serveur via un fichier monté dans `/run/secrets/openrouter_api_key` ou par la variable `OPENROUTER_API_KEY`.
