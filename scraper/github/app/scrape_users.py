from app.utils.github_requests import get_users, get_user, request_failed
from datetime import datetime
from app.utils.storage import store_user


def convert_time_fields_to_date_time(user):
    d = user["created_at"]
    d = datetime.strptime(d, "%Y-%m-%dT%H:%M:%SZ")
    user["created_at"] = d

    d = user["updated_at"]
    d = datetime.strptime(d, "%Y-%m-%dT%H:%M:%SZ")
    user["updated_at"] = d


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

        print("Fetch detailed user {}:{} data...".format(u["id"], u["login"]))
        user = get_user(u["login"])
        if request_failed(user):
            print("Failed to save user data: {} .".format(user))
            return

        print("Storing user {}:{} data...".format(u["id"], u["login"]))
        convert_time_fields_to_date_time(user)
        store_user(user)

        print("Stored user {}:{} data.".format(u["id"], u["login"]))
        print("-----------\n")
    print("Page user data stored.")


def on_pageloaded_error(ret):
    if request_failed(ret):
        print("Failed to save user data: {} .".format(ret))
        return
    print("Failed to save data")


def scrape_users(prs):
    if prs.user_name != "":
        print("[+] Getting dev information about: {}".format(prs.user_name))
        user = get_user(prs.user_name)
        if request_failed(user):
            print("Failed to save user data: {} .".format(user))
        else:
            convert_time_fields_to_date_time(user)
            store_user(user)
    else:
        print("[+] Getting devs from cameroun/cameroon...")
        print("[+] pagination_limit: {}".format(prs.pagination_limit))
        users = get_users(prs.pagination_limit, store_users, on_pageloaded_error)
        print(users)
