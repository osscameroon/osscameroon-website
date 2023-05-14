#!/bin/bash

_export(){
    for i in {1..1500}; do
        save_on="./data/projects_page_$i.json"
        echo "Exporting projects, page $i"

        curl -Ls 'https://api.osscameroon.com/github/projects/search' -X POST \
            -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/112.0' \
            -H 'Accept: application/json, text/plain, */*' \
            -H 'Accept-Language: en-US,en;q=0.5' \
            -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' \
            -H 'Origin: https://osscameroon.com' \
            -H 'Connection: keep-alive' \
            -H 'Referer: https://osscameroon.com/' \
            -H 'Sec-Fetch-Dest: empty' \
            -H 'Sec-Fetch-Mode: cors' \
            -H 'Sec-Fetch-Site: same-site' \
            --data-raw '{"query":"","page":'$i',"count":20,"languages":[],"sort_type":""}' | jq > $save_on;

        lines=$(wc -l $save_on)
        echo ">> $lines ";
        sleep 5;
    done
}

_export
