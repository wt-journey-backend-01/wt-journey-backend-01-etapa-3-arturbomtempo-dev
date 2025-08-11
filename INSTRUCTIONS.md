# Segue algumas instruções para rodar o projeto

## 1. Execução do container docker

```
docker-compose up -d
```

## 2. Execução das migrations

```
npx knex migrate:latest
```

## 3. Execução dos seeds

```
npx knex seed:run
```
