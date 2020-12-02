# github_requests.py
# github requests functions

import requests
import json

from app.settings import GITHUB_API, GITHUB_TOKEN


def status_check(r):
    """

    Just return a message when the request's status is not 200

    @params : the request object
    @returns : a tuple (boolean, object),
                the boolean define if the request gone well and
                the object is detail of error
    """

    if r.status_code != 200:
        return (
            False,
            {
                "status": "error",
                "url": r.url,
                "payload": json.loads(r.content),
                "message": "Something went wrong with the request",
                "code": r.status_code,
            },
        )
    else:
        return True, {}


def get_users(
    pagination_limit: int = 2, on_pageloaded_success=None, on_pageloaded_error=None
):
    """

    This method will just fetch users from
    github api that are in location cameroon or cameroun

    @params : pagination_limit [the number of page we want to fetch]
    @returns : users [json array of users]

    """

    users = []

    for page in range(1, pagination_limit):
        # We set our query
        query = "location:%22cameroon%22+location:%22cameroun%22&page={}".format(page)

        # a simple request to the api
        headers = {"Authorization": "token {}".format(GITHUB_TOKEN)}
        r = requests.get("{}/search/users?q={}".format(GITHUB_API, query), headers=headers)
        # We check the status of the requet and return a predefined error message
        schk = status_check(r)
        if not schk[0]:
            if on_pageloaded_error:
                on_pageloaded_error(schk[1])
            return schk[1]

        # We append or merge
        items = json.loads(r.content)["items"]
        if on_pageloaded_success:
            on_pageloaded_success(items)
        users = users + items
    return users


def get_user(user_name: str):
    """

    This method is for getting details about one user

    @params : user_name [the username of the dev]
    @returns : user_info [the json result form github api]

    """

    if len(user_name) <= 2:
        return {"status": "error", "message": "Please provide a valid username"}
    # We just remove the default @ if it's provide from the user_name
    user_name = user_name.replace("@", "") if "@" in user_name else user_name

    # we make a simple request to the api

    headers = {"Authorization": "token {}".format(GITHUB_TOKEN)}
    r = requests.get("{}/users/{}".format(GITHUB_API, user_name), headers=headers)

    # We check the status of the requet and return a predefined error message
    schk = status_check(r)
    if not schk[0]:
        return schk[1]

    # a simple parse of the response
    user_info = json.loads(r.content)

    return user_info
