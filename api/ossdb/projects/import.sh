#!/bin/bash

json_file="./data/projects_page_1.json"
db_host="localhost"
db_name="ossdb"
db_user="user"
db_password="pwd"


_import() {
    projects=$(jq -c '.result.hits[]' "$json_file")

    while IFS= read -r project; do
        id=$(echo "$project" | jq -r '.id')
        milestones_url=$(echo "$project" | jq -r '.milestones_url')
        assignees_url=$(echo "$project" | jq -r '.assignees_url')
        notifications_url=$(echo "$project" | jq -r '.notifications_url')
        full_name=$(echo "$project" | jq -r '.full_name')
        subscribers_url=$(echo "$project" | jq -r '.subscribers_url')
        issue_events_url=$(echo "$project" | jq -r '.issue_events_url')
        teams_url=$(echo "$project" | jq -r '.teams_url')
        issues_url=$(echo "$project" | jq -r '.issues_url')
        has_projects=$(echo "$project" | jq -r '.has_projects')
        contents_url=$(echo "$project" | jq -r '.contents_url')
        updated_at=$(echo "$project" | jq -r '.updated_at')
        has_downloads=$(echo "$project" | jq -r '.has_downloads')
        disabled=$(echo "$project" | jq -r '.disabled')
        watchers=$(echo "$project" | jq -r '.watchers')
        node_id=$(echo "$project" | jq -r '.node_id')
        description=$(echo "$project" | jq -r '.description')
        merges_url=$(echo "$project" | jq -r '.merges_url')
        homepage=$(echo "$project" | jq -r '.homepage')
        forks_count=$(echo "$project" | jq -r '.forks_count')
        permissions_pull=$(echo "$project" | jq -r '.permissions.pull')
        permissions_admin=$(echo "$project" | jq -r '.permissions.admin')
        permissions_push=$(echo "$project" | jq -r '.permissions.push')
        keys_url=$(echo "$project" | jq -r '.keys_url')
        forks_url=$(echo "$project" | jq -r '.forks_url')
        open_issues_count=$(echo "$project" | jq -r '.open_issues_count')
        comments_url=$(echo "$project" | jq -r '.comments_url')
        language=$(echo "$project" | jq -r '.language')
        has_pages=$(echo "$project" | jq -r '.has_pages')
        trees_url=$(echo "$project" | jq -r '.trees_url')
        branches_url=$(echo "$project" | jq -r '.branches_url')
        archived=$(echo "$project" | jq -r '.archived')
        subscription_url=$(echo "$project" | jq -r '.subscription_url')
        labels_url=$(echo "$project" | jq -r '.labels_url')
        license_key=$(echo "$project" | jq -r '.license.key')
        license_name=$(echo "$project" | jq -r '.license.name')
        license_spdx_id=$(echo "$project" | jq -r '.license.spdx_id')
        license_url=$(echo "$project" | jq -r '.license.url')
        has_issues=$(echo "$project" | jq -r '.has_issues')
        git_refs_url=$(echo "$project" | jq -r '.git_refs_url')
        forks=$(echo "$project" | jq -r '.forks')
        issue_comment_url=$(echo "$project" | jq -r '.issue_comment_url')
        size=$(echo "$project" | jq -r '.size')
        languages_url=$(echo "$project" | jq -r '.languages_url')
        blobs_url=$(echo "$project" | jq -r '.blobs_url')
        html_url=$(echo "$project" | jq -r '.html_url')
        open_issues=$(echo "$project" | jq -r '.open_issues')
        ssh_url=$(echo "$project" | jq -r '.ssh_url')
        contributors_url=$(echo "$project" | jq -r '.contributors_url')
        has_wiki=$(echo "$project" | jq -r '.has_wiki')
        releases_url=$(echo "$project" | jq -r '.releases_url')
        git_commits_url=$(echo "$project" | jq -r '.git_commits_url')
        owner_html_url=$(echo "$project" | jq -r '.owner.html_url')
        owner_gravatar_id=$(echo "$project" | jq -r '.owner.gravatar_id')
        owner_received_events_url=$(echo "$project" | jq -r '.owner.received_events_url')
        owner_repos_url=$(echo "$project" | jq -r '.owner.repos_url')
        owner_site_admin=$(echo "$project" | jq -r '.owner.site_admin')
        owner_node_id=$(echo "$project" | jq -r '.owner.node_id')
        owner_avatar_url=$(echo "$project" | jq -r '.owner.avatar_url')
        owner_gists_url=$(echo "$project" | jq -r '.owner.gists_url')
        owner_subscriptions_url=$(echo "$project" | jq -r '.owner.subscriptions_url')
        owner_login=$(echo "$project" | jq -r '.owner.login')
        owner_followers_url=$(echo "$project" | jq -r '.owner.followers_url')
        owner_url=$(echo "$project" | jq -r '.owner.url')
        owner_following_url=$(echo "$project" | jq -r '.owner.following_url')
        owner_type=$(echo "$project" | jq -r '.owner.type')
        owner_starred_url=$(echo "$project" | jq -r '.owner.starred_url')
        owner_organizations_url=$(echo "$project" | jq -r '.owner.organizations_url')
        owner_events_url=$(echo "$project" | jq -r '.owner.events_url')
        owner_id=$(echo "$project" | jq -r '.owner.id')
        default_branch=$(echo "$project" | jq -r '.default_branch')
        fork=$(echo "$project" | jq -r '.fork')
        compare_url=$(echo "$project" | jq -r '.compare_url')
        mirror_url=$(echo "$project" | jq -r '.mirror_url')
        commits_url=$(echo "$project" | jq -r '.commits_url')
        git_tags_url=$(echo "$project" | jq -r '.git_tags_url')
        archive_url=$(echo "$project" | jq -r '.archive_url')
        clone_url=$(echo "$project" | jq -r '.clone_url')
        svn_url=$(echo "$project" | jq -r '.svn_url')
        tags_url=$(echo "$project" | jq -r '.tags_url')
        events_url=$(echo "$project" | jq -r '.events_url')
        statuses_url=$(echo "$project" | jq -r '.statuses_url')
        project_url=$(echo "$project" | jq -r '.url')
        stargazers_url=$(echo "$project" | jq -r '.stargazers_url')
        downloads_url=$(echo "$project" | jq -r '.downloads_url')
        private=$(echo "$project" | jq -r '.private')
        stargazers_count=$(echo "$project" | jq -r '.stargazers_count')
        deployments_url=$(echo "$project" | jq -r '.deployments_url')
        git_url=$(echo "$project" | jq -r '.git_url')
        collaborators_url=$(echo "$project" | jq -r '.collaborators_url')
        created_at=$(echo "$project" | jq -r '.created_at')
        name=$(echo "$project" | jq -r '.name')
        watchers_count=$(echo "$project" | jq -r '.watchers_count')
        pushed_at=$(echo "$project" | jq -r '.pushed_at')
        hooks_url=$(echo "$project" | jq -r '.hooks_url')
        pulls_url=$(echo "$project" | jq -r '.pulls_url')
        allow_forking=$(echo "$project" | jq -r '.allow_forking')
        visibility=$(echo "$project" | jq -r '.visibility')
        is_template=$(echo "$project" | jq -r '.is_template')
        topics=$(echo "$project" | jq -c -r '.topics[]')

        # Insert the data into the PostgreSQL database
        psql -h "$db_host" -d "$db_name" -U "$db_user" -c "
            INSERT INTO projects (
                id, milestones_url, assignees_url, notifications_url,
                full_name, subscribers_url, issue_events_url, teams_url, issues_url, has_projects,
                contents_url, updated_at, has_downloads, disabled, watchers, node_id, description,
                merges_url, homepage, forks_count, permissions_pull, permissions_admin, permissions_push,
                keys_url, forks_url, open_issues_count, comments_url, language, has_pages, trees_url,
                branches_url, archived, subscription_url, labels_url, license_key, license_name,
                license_spdx_id, license_url, has_issues, git_refs_url, forks, issue_comment_url,
                size, languages_url, blobs_url, html_url, open_issues, ssh_url, contributors_url,
                has_wiki, releases_url, git_commits_url, owner_html_url, owner_gravatar_id,
                owner_received_events_url, owner_repos_url, owner_site_admin, owner_node_id,
                owner_avatar_url, owner_gists_url, owner_subscriptions_url, owner_login,
                owner_followers_url, owner_url, owner_following_url, owner_type, owner_starred_url,
                owner_organizations_url, owner_events_url, owner_id, default_branch, fork,
                compare_url, mirror_url, commits_url, git_tags_url, archive_url, clone_url,
                svn_url, tags_url, events_url, statuses_url, project_url, stargazers_url,
                downloads_url, private, stargazers_count, deployments_url, git_url,
                collaborators_url, created_at, name, watchers_count, pushed_at,
                hooks_url, pulls_url, allow_forking, visibility, is_template
            )
            VALUES (
                '$id', '$milestones_url', '$assignees_url', '$notifications_url', '$full_name', '$subscribers_url',
                '$issue_events_url', '$teams_url', '$issues_url', '$has_projects', '$contents_url', '$updated_at',
                '$has_downloads', '$disabled', '$watchers', '$node_id', '$description', '$merges_url', '$homepage',
                '$forks_count', '$permissions_pull', '$permissions_admin', '$permissions_push', '$keys_url', '$forks_url',
                '$open_issues_count', '$comments_url', '$language', '$has_pages', '$trees_url', '$branches_url',
                '$archived', '$subscription_url', '$labels_url', '$license_key', '$license_name', '$license_spdx_id',
                '$license_url', '$has_issues', '$git_refs_url', '$forks', '$issue_comment_url', '$size', '$languages_url',
                '$blobs_url', '$html_url', '$open_issues', '$ssh_url', '$contributors_url', '$has_wiki', '$releases_url',
                '$git_commits_url', '$owner_html_url', '$owner_gravatar_id', '$owner_received_events_url',
                '$owner_repos_url', '$owner_site_admin', '$owner_node_id', '$owner_avatar_url', '$owner_gists_url',
                '$owner_subscriptions_url', '$owner_login', '$owner_followers_url', '$owner_url', '$owner_following_url',
                '$owner_type', '$owner_starred_url', '$owner_organizations_url', '$owner_events_url', '$owner_id',
                '$default_branch', '$fork', '$compare_url', '$mirror_url', '$commits_url', '$git_tags_url', '$archive_url',
                '$clone_url', '$svn_url', '$tags_url', '$events_url', '$statuses_url', '$project_url', '$stargazers_url',
                '$downloads_url', '$private', '$stargazers_count', '$deployments_url', '$git_url', '$collaborators_url',
                '$created_at', '$name', '$watchers_count', '$pushed_at', '$hooks_url', '$pulls_url', '$allow_forking',
                '$visibility', '$is_template'
            );
    done <<< "$projects"
}

_import
