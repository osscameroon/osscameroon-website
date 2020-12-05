#!/bin/bash

FILES=$(cat files.txt)
TARGET=$(cat target.txt)
cd ../
# caparledev-deploy the droplet host (in this case it was set in elhmn's .ssh/config file)
scp -r $FILES caparledev-deploy:$TARGET
