#!/bin/sh

scp -r ../cron.txt caparledev-deploy:caparledev-website/crons
ssh caparledev-deploy 'cd caparledev-website/crons && crontab cron.txt'
