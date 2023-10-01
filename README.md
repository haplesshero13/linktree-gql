# Links GraphQL Backend

For use with https://github.com/haplesshero13/linktree-react-native.

## Description

This is the NestJS Apollo backend for the Links app. It uses TypeORM to access the Postgres DB.

## Installation

```bash
$ yarn install
```

## Running the app

First install docker and docker-compose (the Docker Desktop app is probably easiest: https://docs.docker.com/desktop/).

Boot the Postgres DB with `docker-compose up -d`.

Then start the app:

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
