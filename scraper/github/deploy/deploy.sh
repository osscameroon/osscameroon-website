#!/bin/bash

FILES=$(cat files.txt)
cd ../
# caparledev-deploy the droplet host (in this case it was set in elhmn's .ssh/config file)
scp -r $FILES caparledev-deploy:/home/deploy/caparledev-website/crons/github
