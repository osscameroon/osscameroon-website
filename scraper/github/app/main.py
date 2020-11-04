# main.py
# THe main cli script

from app.utils.github_requests import get_users, get_user
import argparse

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
        print(get_user(prs.user_name))
    else:
        print("[+] Getting devs from cameroun/cameroon...")
        print("[+] pagination_limit: {}".format(prs.pagination_limit))
        print(get_users(prs.pagination_limit))
