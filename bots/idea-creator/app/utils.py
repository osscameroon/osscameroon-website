# utils
# All necessary functions

import json
import requests

from app.settings import (
    HOST,
    REPO_OWNER,
    REPO_NAME,
    GITHUB_TOKEN
)


def format_body_issue(title: str, short_desc: str, why: str, description: str) -> str:
    """
    This method will just take some input parameters and build a small nice markdown
    For the idea in a project

    params:
        title,
        short_desc,
        why,
        description

    returns: template
    """

    template = """
# {}

{}

## Why ?

{}

## Description

{}

## License
[MIT](https://choosealicense.com/licenses/mit/)

""".format(title.upper(), short_desc, why, description)

    return template


def make_github_issue(title: str, body=None, labels=None) -> bool:
    """
    Create an issue on github.com using the given parameters.

    params:
        title: The title of the issue
        body: The body of the issue
        labels: labels of that issue

    returns: bool either the process gone good or wrong
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
        return True
    else:
        print('[x] Could not create Issue {0:s}'.format(title))
        print('[x] Response:', r.content)
        return False


def check_content(to_check):
    """
    This method will :
        - check the size of each element
        - check the content string (if it talk about porn, politic, etc... and remove it)
        - check extract characters
        - follow image link to be sure it's a good content

    params:
        to_check: is an object define as this:
            - max-size : int
            - min-size : int
            - content : str

    returns: bool if all of that have been respected
    """

    return True


def create_project_idea(title: str, short_desc: str, why: str, description: str, labels=None):
    """
    This is the main formtion for formating and create our issue on github

    params:
        title,
        short_desc,
        why,
        description
        labels

    returns: void
    """
    # Just to check each input parameter
    check_title = {
        "content": title,
        "max-size": 20,
        "min-size": 3
    }
    if check_content(check_title):
        # we build the body
        body = format_body_issue(title, short_desc, why, description)

        # the we send our issue
        return make_github_issue(
            title,
            body,
            labels
        )
