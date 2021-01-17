#!/bin/bash

cd ..
FILES=$(find ./* -maxdepth 0 | grep -vf ./deploy/excluded_files.txt)

TARGET=$(cat ./deploy/target.txt)/scraper/twitter
ARCHIVE=build.tar

# caparledev-deploy the droplet host (in this case it was set in elhmn's .ssh/config file)
tar -cvf $ARCHIVE $FILES
scp -r $ARCHIVE caparledev-deploy:$TARGET
ssh caparledev-deploy "cd $TARGET && tar -xvf $ARCHIVE && rm -rf build.tar"
