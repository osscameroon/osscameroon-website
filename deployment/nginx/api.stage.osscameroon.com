server {
    listen 80;
    server_name api.stage.osscameroon.com www.api.stage.osscameroon.com;

    location / {
        include uwsgi_params;
        uwsgi_pass unix:/home/deploy/caparledev-website/stage/caparledev-website/api/caparledev-api.sock;
    }
}
