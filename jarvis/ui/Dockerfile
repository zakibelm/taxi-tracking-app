FROM node:20-bullseye AS build
WORKDIR /app
COPY package.json ./
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build

FROM node:20-bullseye
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app .
EXPOSE 3000
CMD ["npm","start"]
