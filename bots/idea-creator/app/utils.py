import os
import json
import requests

from app.settings import (
    HOST,
    REPO_OWNER,
    REPO_NAME,
    GITHUB_TOKEN
)


def make_github_issue(title, body=None, labels=None):
    """
    Create an issue on github.com using the given parameters.

    params:
        title: The title of the issue
        body: The body of the issue
        labels: labels of that issue

    returns: void
    """

    # Our url to create issues via POST
    url = "{}/repos/{}/{}/issues".format(HOST, REPO_OWNER, REPO_NAME)
    # Create an authenticated session to create the issue
    session = requests.Session()
    headers = {
        'Authorization': 'token {}'.format(GITHUB_TOKEN)
    }

    # Create our issue
    issue = {
        "title": title,
        "body": body,
        "labels": labels
    }
    # Add the issue to our repository
    r = session.post(url, json.dumps(issue), headers=headers)
    if r.status_code == 201:
        print('[+] Successfully created Issue {0:s}'.format(title))
    else:
        print('[x] Could not create Issue {0:s}'.format(title))
        print('[x] Response:', r.content)


make_github_issue("issue test", "desciption test", ["test"])
