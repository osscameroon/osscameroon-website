# github_requests.py
# github requests functions

import requests
import json
from typing import List, Dict, Tuple, Union, Callable
import logging
from app.settings import GITHUB_API, GITHUB_TOKEN
from datetime import date

logging.basicConfig(level=logging.DEBUG)


class GithubClient:
    """
    This is a client to access Github API
    """

    def __init__(self):
        self.GITHUB_API = GITHUB_API
        self.GITHUB_TOKEN = GITHUB_TOKEN
        self.session: requests.Session = requests.Session()
        self.session.headers.update({"Authorization": f"token {self.GITHUB_TOKEN}"})
        self.logger = logging.getLogger("")

        # configure a console handler
        # console = logging.StreamHandler()
        # console.setLevel(logging.INFO)
        # self.logger.addHandler(console)

    def request_failed(self, ret: Dict) -> bool:
        return ret and "status" in ret and ret["status"] == "error"

    def status_check(self, r: requests.Response) -> Tuple[bool, Dict]:
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

    def get_users(self, pagination_limit: int = 2, on_pageloaded_success: Callable[[List[Dict]], None] = None,  # noqa: C901
                  on_pageloaded_error: Callable[[Dict], None] = None) -> Union[List[Dict], Dict]:
        """

        This method will just fetch users from
        github api that are in location cameroon or cameroun

        @params : pagination_limit [the number of page we want to fetch]
        @returns : users [json array of users]

        """
        users = []
        users_ids = set()
        per_page = 100
        last_date = str(date.today())
        page = 1
        self.logger.info(f"Starting to fetch users in cameroon/cameroun, max_page={pagination_limit},"
                         f" per_page={per_page}, last_updated_date={last_date}")

        while pagination_limit:
            # We set our query
            # .format() is slow let's use f-string
            self.logger.info(f"Fetching page={page}, last_date={last_date}")
            query = f"created:<{last_date}+sort:joined-desc+location:%22cameroon%22+location:%22cameroun%22" \
                    f"&page={page}&per_page={per_page}"

            # a simple request to the api
            r = self.session.get(f"{self.GITHUB_API}/search/users?q={query}")
            # We check the status of the requet and return a predefined error message
            schk = self.status_check(r)
            if not schk[0]:
                # we check if on_pageloaded_error is a function
                error_code = schk[1]["code"]
                if error_code == 422:  # we hit 1000 limit, downgrading the date
                    last_user: dict = users[-1]
                    last_user = self.get_user(last_user["login"])
                    updated_at: str = last_user["updated_at"]
                    if updated_at:
                        last_date = updated_at.split("T")[0]
                        page = 1
                        continue

                if callable(on_pageloaded_error):
                    on_pageloaded_error(schk[1])
                else:
                    self.logger.warning(f"on_pageloaded_error is passed but it is not callable {on_pageloaded_error}")
                return schk[1]

            items = r.json()["items"]
            # if we encounter an empty list we break
            if not len(items):
                break
            self.logger.info(f"Found users {[user['login'] for user in items]}")

            unique_items = []
            for item in items:
                if item["id"] in users_ids:
                    continue

                unique_items.append(item)
                users_ids.add(item["id"])

            if callable(on_pageloaded_success):
                on_pageloaded_success(unique_items)
            else:
                self.logger.warning(f"on_pageloaded_success is passed but it is not callable {on_pageloaded_success}")

            # We append or merge by ensuring uniciting
            users.extend(unique_items)

            # if we get less than per_page there is no more result
            if len(items) < per_page:
                break

            page += 1
            pagination_limit -= 1  # ensure we respect the pagination
            # time.sleep(1) # we sleep 1 seconds to no flood the api

        self.logger.info(f"We found a total of {len(users)} users")
        return users

    def get_user(self, user_name: str) -> Dict:
        """

        This method is for getting details about one user

        @params : user_name [the username of the dev]
        @returns : user_info [the dict result form github api]

        """

        self.logger.info(f"Fetching user {user_name}")
        if len(user_name) <= 2:
            return {"status": "error", "message": "Please provide a valid username"}
        # We just remove the default @ if it's provide from the user_name
        user_name = user_name.replace("@", "") if "@" in user_name else user_name

        # we make a simple request to the api

        r = self.session.get(f"{self.GITHUB_API}/users/{user_name}")

        # We check the status of the request and return a predefined error message
        schk = self.status_check(r)
        if not schk[0]:
            return schk[1]

        # return the result as dict
        return r.json()

    def get_user_repos(self, user_name: str) -> Union[List[Dict], Dict]:
        """

        This method is for getting details about one user

        @params : user_name [the username of the dev]
        @returns : repositories [the json result form github api]

        """

        self.logger.info(f"Fetching user {user_name} repos")
        if len(user_name) <= 2:
            return {"status": "error", "message": "Please provide a valid username"}
        # We just remove the default @ if it's provide from the user_name
        user_name = user_name.replace("@", "") if "@" in user_name else user_name

        # we make a simple request to the api

        r = self.session.get(f"{self.GITHUB_API}/users/{user_name}/repos")

        # We check the status of the request and return a predefined error message
        schk = self.status_check(r)
        if not schk[0]:
            return schk[1]

        return r.json()
