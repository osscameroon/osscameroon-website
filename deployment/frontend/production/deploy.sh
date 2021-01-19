#!/bin/sh

echo "Starting production deployment"
source ./env
#move to frontend repository
cd ../../../frontend/
echo "Moved to frontend folder"
yarn build
ssh caparledev-deploy 'rm -rf caparledev-website/frontend-prod/build_old && mv caparledev-website/frontend-prod/{build,build_old}'
scp -r build caparledev-deploy:caparledev-website/frontend-prod/
echo "Production deployment DONE"
