FROM node:20-bullseye
RUN apt-get update && apt-get install -y dumb-init && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json ./
RUN npm install || true
COPY . .
USER node
EXPOSE 3001
CMD ["dumb-init", "node", "index.js"]
