server {
        listen 80;
        listen [::]:80;

        server_name stage.osscameroon.com www.stage.osscameroon.com;

        root /home/deploy/caparledev-website/frontend-stage/build;
        index index.html;

        location / {
                try_files $uri $uri/ /index.html;
        }
}
