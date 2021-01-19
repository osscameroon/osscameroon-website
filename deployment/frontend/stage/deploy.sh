#!/bin/sh

echo "Starting stage deployment"
source ./env
#move to frontend repository
cd ../../../frontend/
echo "Moved to frontend folder"
yarn build
ssh caparledev-deploy 'rm -rf caparledev-website/frontend-stage/build_old && mv caparledev-website/frontend-stage/{build,build_old}'
scp -r build caparledev-deploy:caparledev-website/frontend-stage/
echo "Stage deployment DONE"
