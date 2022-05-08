# stage 1
FROM node:16-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

# stage 2
FROM node:16-alpine AS production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --omit=dev

COPY . .
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
