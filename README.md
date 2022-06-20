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
- [README](./backend/README.md)

# Cloud

- Frontend deployed here: https://near-vbi-k5-backend.vercel.app/
- Smart contract Id: [dev-1655624955810-47042894622488](https://explorer.testnet.near.org/accounts/dev-1655624955810-47042894622488)
