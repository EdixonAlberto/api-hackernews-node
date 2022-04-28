# stage 1
FROM node:16-alpine AS development

WORKDIR /usr/app

COPY package*.json ./

RUN npm i --only=development

COPY . .

RUN npm run build

# stage 2
FROM node:16-alpine AS production

WORKDIR /usr/app

COPY package*.json ./

RUN npm i --only=production

COPY . .
COPY --from=development /usr/app/dist ./dist
COPY .env .

CMD ["npm", "run", "start:prod"]
