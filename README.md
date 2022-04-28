# API Hacker News Node

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Api to get related articles about Node.js in Hacker News

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
