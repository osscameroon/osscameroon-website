# Deployment systemctl service files

This file should are and must be present in the `/etc/systemd/system` folder

## Manage your service

o **enable** a service run

```sh
sudo systemctl enable meilisearch-prod
```

To **start** a service run

```sh
sudo systemctl start <service_name>
```

To **restart** a serice run

```sh
sudo systemctl restart <service_name>
```

To check you service **status** run

```sh
sudo systemctl status <service_name>
```

### Monitoring

To check your service logs run

```sh
sudo journalctl -u <service_name>
```

### Debugging

If your service does not want to stop, start or restart run

```sh
sudo systemctl daemon-reload
```
