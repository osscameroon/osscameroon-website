#!/bin/bash

json_file="user_page_1.json"
db_host="localhost"
db_name="ossdb"
db_user="user"
db_password="pass"


_import() {
    users=$(jq -c '.result.hits[]' "$json_file")

    while IFS= read -r user; do
        id=$(echo "$user" | jq -r '.id')
        avatar_url=$(echo "$user" | jq -r '.avatar_url')
        name=$(echo "$user" | jq -r '.name')
        following=$(echo "$user" | jq -r '.following')
        bio=$(echo "$user" | jq -r '.bio')
        node_id=$(echo "$user" | jq -r '.node_id')
        following_url=$(echo "$user" | jq -r '.following_url')
        url=$(echo "$user" | jq -r '.url')
        type=$(echo "$user" | jq -r '.type')
        starred_url=$(echo "$user" | jq -r '.starred_url')
        followers=$(echo "$user" | jq -r '.followers')
        site_admin=$(echo "$user" | jq -r '.site_admin')
        location=$(echo "$user" | jq -r '.location')
        twitter_username=$(echo "$user" | jq -r '.twitter_username')
        organizations_url=$(echo "$user" | jq -r '.organizations_url')
        public_gists=$(echo "$user" | jq -r '.public_gists')
        repos_url=$(echo "$user" | jq -r '.repos_url')
        email=$(echo "$user" | jq -r '.email')
        company=$(echo "$user" | jq -r '.company')
        received_events_url=$(echo "$user" | jq -r '.received_events_url')
        html_url=$(echo "$user" | jq -r '.html_url')
        public_repos=$(echo "$user" | jq -r '.public_repos')
        login=$(echo "$user" | jq -r '.login')
        subscriptions_url=$(echo "$user" | jq -r '.subscriptions_url')
        blog=$(echo "$user" | jq -r '.blog')
        updated_at=$(echo "$user" | jq -r '.updated_at')
        gravatar_id=$(echo "$user" | jq -r '.gravatar_id')
        gists_url=$(echo "$user" | jq -r '.gists_url')
        created_at=$(echo "$user" | jq -r '.created_at')
        events_url=$(echo "$user" | jq -r '.events_url')
        hireable=$(echo "$user" | jq -r '.hireable')
        followers_url=$(echo "$user" | jq -r '.followers_url')

        # On insert les datas avec psql dans notre postgres
        psql -h "$db_host" -d "$db_name" -U "$db_user" -c "
            INSERT INTO users (
                id, avatar_url, name, following, bio, node_id, following_url, url, type, starred_url,
                followers, site_admin, location, twitter_username, organizations_url, public_gists,
                repos_url, email, company, received_events_url, html_url, public_repos, login,
                subscriptions_url, blog, updated_at, gravatar_id, gists_url, created_at, events_url,
                hireable, followers_url
            )
            VALUES (
                '$id', '$avatar_url', '$name', '$following', '$bio', '$node_id', '$following_url', '$url', '$type', '$starred_url',
                '$followers', '$site_admin', '$location', '$twitter_username', '$organizations_url', '$public_gists',
                '$repos_url', '$email', '$company', '$received_events_url', '$html_url', '$public_repos', '$login',
                '$subscriptions_url', '$blog', '$updated_at', '$gravatar_id', '$gists_url', '$created_at', '$events_url',
                '$hireable', '$followers_url'
            );
        "
    done <<< "$users"
}

_import
