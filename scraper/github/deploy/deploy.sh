#!/bin/bash

FILES=$(cat files.txt)
TARGET=$(cat target.txt)/scraper/github
ARCHIVE=build.tar
cd ../
# caparledev-deploy the droplet host (in this case it was set in elhmn's .ssh/config file)
tar -cvf $ARCHIVE $FILES
scp -r $ARCHIVE caparledev-deploy:$TARGET
ssh caparledev-deploy "cd $TARGET && tar -xvf $ARCHIVE && rm -rf build.tar"
