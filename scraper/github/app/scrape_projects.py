import time
from datetime import datetime

from app.utils.github_requests import GithubClient
from app.utils.storage import fetch_all_users, store_project


def convert_time_fields_to_date_time(repo):
    d = repo["created_at"]
    d = datetime.strptime(d, "%Y-%m-%dT%H:%M:%SZ")
    repo["created_at"] = d

    d = repo["updated_at"]
    d = datetime.strptime(d, "%Y-%m-%dT%H:%M:%SZ")
    repo["updated_at"] = d


def filter_relevant_repos(repos):
    ret = []
    stargazers_count_threshold = 5

    for r in repos:
        if r["fork"]:
            continue
        if r["stargazers_count"] < stargazers_count_threshold:
            continue
        ret.append(r)
    return ret


def on_pageloaded_success(page):
    github_cli = GithubClient()

    for u in page:
        user_name = u["login"]
        print("fetching user {} repositories...".format(user_name))
        repos = github_cli.get_user_repos(user_name)
        if github_cli.request_failed(repos):
            print(
                "Error: {}: failed to get user {} repositories.".format(
                    repos, user_name
                )
            )
            return
        print("user {} repositories successfully fetched!".format(user_name))
        # A relevant repositories is here indentified by criterias
        # as how many stars the repos has and whether it is a fork or not
        repos = filter_relevant_repos(repos)
        repos_len = len(repos)
        print("relevant: {} repos found.".format(repos_len))
        if repos_len > 0:
            print("storing user {} relevant public repositories...".format(user_name))
            for r in repos:
                print("storing project {} ...".format(r["name"]))
                convert_time_fields_to_date_time(r)
                store_project(r)
                print("project {} stored".format(r["name"]))
            print("user {} relevant public repositories stored !".format(user_name))

        # we sleep a little to mitigate github api rest limits
        print("\n")
    pause_time = 5
    print("Waiting for {} seconds".format(pause_time))
    time.sleep(pause_time)
    print("End page process !\n")


def scrape_projects(prs):
    print("[+] Getting devs from cameroun/cameroon...")
    fetch_all_users(on_pageloaded_success=on_pageloaded_success)
