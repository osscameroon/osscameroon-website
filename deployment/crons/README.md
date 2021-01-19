# Crons config folder

The cron configuration folder contains cron job specification for several applications

## Sync

To sync your cron on the deployment server run

```sh
cd ./scripts
./sync_crons.sh
```

## Setup

To **check** what cron jobs are installed on a user account run

```sh
crontab -l
```

To **setup** your cron job run

```sh
crontab cron.txt
```

To **remove** your crons run

```sh
crontab -r
```
