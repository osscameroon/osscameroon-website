# main.py
# THe main cli script

from app.utils.github_requests import get_users, get_user
from app.utils.storage import store_user
import argparse
import sys


def store_users(users):
    """

        This callback stores user data in our gcp datastore database

        @params: users array

    """

    print("Storing page users data...")
    for u in users:
        if not u:
            print("Failed to save user data.")
            continue

        print("Storing user {}:{} data...".format(u["id"], u["login"]))
        store_user(u)
        print("Stored user {}:{} data.".format(u["id"], u["login"]))
    print("Page user data stored.")


def on_pageloaded_error(error):
    if error and "status" in error and error["status"] == "error":
        print("Failed to save user data: {} .".format(error))
        return
    print("Failed to save data")


if __name__ == "__main__":
    # Usage :
    # python3 -m app.main -u elhmne # to get infos from elhmne
    # python3 -m app.main -p 10 # to get, first 10 pages of users on github

    print("[+] CaParleDev-Scrapper started...")
    # Initialize the arguments
    prs = argparse.ArgumentParser()
    prs.add_argument(
        "-u",
        "--user_name",
        default="",
        help="We specify the username of the user we want to get informations",
        type=str,
    )
    prs.add_argument(
        "-p",
        "--pagination_limit",
        default=2,
        help="The pagination_limit is for the number of pages when getting users list",
        type=int,
    )

    prs = prs.parse_args()

    if prs.user_name != "":
        print("[+] Getting dev information about: {}".format(prs.user_name))
        user = get_user(prs.user_name)
        print(user)
        store_user(user)
    else:
        print("[+] Getting devs from cameroun/cameroon...")
        print("[+] pagination_limit: {}".format(prs.pagination_limit))

        users = get_users(prs.pagination_limit, store_users, on_pageloaded_error)
        print(users)
