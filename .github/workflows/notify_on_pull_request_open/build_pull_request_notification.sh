#!/bin/sh

FILE=$1

LINK=$(cat $FILE | jq '.pull_request._links.html.href' -r)
TITLE=$(cat $FILE | jq '.pull_request.title' -r)
DESCRIPTION=$(cat $FILE | jq '.pull_request.body' -r)
USER=$(cat $FILE | jq '.sender.login' -r)

echo "A new pull request was submitted by $USER"
echo "Please check it out here $LINK"
echo "And feel free to review it"
echo ""
echo "Title: $TITLE"
echo "Description: "
echo "$DESCRIPTION"
