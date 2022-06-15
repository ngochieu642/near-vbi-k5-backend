# Local
## Frontend
- [README](./frontend/README.md)

## Set up database & adminer

- This will create a postgres container and an adminer container
- This will also restore scripts inside `./sql`
```bash
$ make dev-setup
```

- When you don't want the container (and their volume) to exist anymore
```bash
$ make dev-teardown
```

## Backend
- [README](./backkend/README.md)

# Cloud

- The stack is deployed here: TODO