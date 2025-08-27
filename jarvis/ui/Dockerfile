FROM node:20-bullseye AS build
WORKDIR /app
COPY package.json ./
RUN npm install || true
COPY . .
RUN npm run build || true

FROM node:20-bullseye
WORKDIR /app
COPY --from=build /app .
USER node
EXPOSE 3000
CMD ["node", "node_modules/next/dist/bin/next", "start"]
