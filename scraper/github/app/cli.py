import argparse

from app.scrape_projects import scrape_projects
from app.scrape_users import scrape_users

if __name__ == "__main__":
    # Usage :
    # - scrape users:
    #   python3 -m app.cli users -u elhmne # to get infos from elhmne
    #   python3 -m app.cli users -p 10 # to get, first 10 pages of users on github
    #
    # - scrape projects:
    #   python3 -m app.cli projects

    print("[+] CaParleDev-Scrapper started...")
    # Initialize the arguments
    prs = argparse.ArgumentParser()
    prs.add_argument(
        "type", type=str, help="run github scraper of type = { users | projects}"
    )

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

    if prs.type == "users":
        scrape_users(prs)
    elif prs.type == "projects":
        scrape_projects(prs)
