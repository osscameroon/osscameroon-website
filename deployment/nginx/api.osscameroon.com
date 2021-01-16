server {
    listen 80;
    server_name api.osscameroon.com www.api.osscameroon.com;

    location / {
        include uwsgi_params;
        uwsgi_pass unix:/home/deploy/caparledev-website/production/caparledev-website/api/caparledev-api.sock;
    }
}
