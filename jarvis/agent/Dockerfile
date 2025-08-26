FROM node:20-bullseye

# Install dumb-init
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json ./
RUN npm install --production && npm cache clean --force
COPY . .
RUN mkdir -p /app/data && chown -R node:node /app
USER node
EXPOSE 3001
ENTRYPOINT ["dumb-init", "node", "index.js"]
