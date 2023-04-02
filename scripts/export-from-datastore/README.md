# EXPORT DATA FROM GCP

## REQUIREMENTS

- make
- `client_secrets.json` file that should contain your gcp creds
- go (>=1.17 recommended)

## HOW TO INSTALL

```bash
# setup an environment to install deps in it
# then run the installation script
make install
```

## HOW TO RUN

- to export from gcp

```bash
make export_data
```

- to import to postgres

```bash
# make sure to have a .env file available
# cp .env.example .env
make import_data
```
