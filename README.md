# API Hacker News Node

![template](https://repository-images.githubusercontent.com/489782685/58ad8c53-7725-4e78-82fc-eb38f95e2c76)

## Description

Api to get related articles about Node.js in Hacker News.

Documentation &#x279c; **[OpenAPI Specification](https://edixonalberto.github.io/api-hackernews-node/index.html)**

---

## Started

A `.env` file must be created in the root of the project, for this you can execute the following command and copy the
provided variables template

```sh
cp template.env .env
```

After setting the environment variables the project can be executed in various ways. The `docker-compose.yml` file will
read the `NODE_ENV` environment variable defined in the `.env` file to start the project in the correct environment.

- In Docker

```bash
# no logs
docker-compose up -d

# show logs
docker-compose up
```

> NOTA: If you want to use the local database via docker-compose you should set this environment variable like this:
> `DB_HOST=db`

- In Local

```bash
# run only the database
docker-compose up -d db

# install dependencies locally
npm install

# run app in development mode
npm run start:dev

# run app in production mode
$ npm run start:prod
```

To fill the database for the first time you must use the following endpoint: `POST: /api/posts/refresh`, it will fill
the `posts` table for the first time and keep it updated **once a time**.

Then a user must be created to authenticate and generate an **access token** and thus be able to interact with the other
routes.

All endpoints are documented in the following endpoint: `GET: /api/docs`

## Testing

In the [/docs](/docs) folder there is a postman collection with all the endpoints ready to test

Before executing the e2e tests, make sure you have the database up and running. For this you can use the command:
`docker-compose up -d db`

- Test Commnands:

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

> NOTA: Please note that this project was built and tested using the following technologies environment:

- docker v20.10.13
- docker-compose v1.29.2
- node v16.14.2
- npm v8.7.0
- nestjs/cli v8.2.5
