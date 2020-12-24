from google.cloud import datastore
import json
import datetime

# For the gcloud auth to work properly this env variable should be set
# GOOGLE_APPLICATION_CREDENTIALS=.secrets/service-account.json

KIND_USERS = "github_users"
KIND_PROJECTS = "github_projects"
__CLIENT = None

def __get_client():
    global __CLIENT
    if __CLIENT is None:
        __CLIENT = datastore.Client()
    return __CLIENT

def convert_datetime_fields_to_string(data: dict):
    """
    this function converts top level field of type datetime
    to string
    """

    for key, val in data.items():
        if isinstance(val, (datetime.date, datetime.datetime)):
            data[key] = val.strftime("%Y-%m-%dT%H:%M:%SZ")
    return data


def sanitize_user_data(data):
    """
    sanitize_user_data [prepare user data format]
    @params: data
    """

    data = convert_datetime_fields_to_string(data)
    return data


def sanitize_array_of_user_data(data_arr: list):
    """
    sanitize_array_of_user_data [prepare array of user data format]
    @params: data_arr
    """
    for data in data_arr:
        data = sanitize_user_data(data)
    return data_arr


def store_user(user: dict):
    """
        Stores user data in our gcp datastore server

        @params : user data
    """

    if not user:
        return

    client = __get_client()
    key = client.key(KIND_USERS, user["id"])
    data = datastore.Entity(key)
    data.update(user)
    client.put(data)

def store_project(repo: dict):
    """
        Stores open source project in our gcp datastore server

        @params : open source repo
    """

    if not repo:
        return

    client = __get_client()
    key = client.key(KIND_PROJECTS, repo["id"])
    data = datastore.Entity(key)
    data.update(repo)
    client.put(data)


def get_one_page_of_users(cursor=None, limit: int = 20):
    client = __get_client()
    query = client.query(kind=KIND_USERS)
    query_iter = query.fetch(start_cursor=cursor, limit=limit)
    page = next(query_iter.pages)

    result = list(page)
    result = sanitize_array_of_user_data(result)

    next_cursor = query_iter.next_page_token
    return result, next_cursor


def fetch_all_users(on_pageloaded_success=None):
    pages = []
    page, next_cursor = get_one_page_of_users()
    if on_pageloaded_success:
        on_pageloaded_success(page)
    pages += page

    while next_cursor:
        page, next_cursor = get_one_page_of_users(cursor=next_cursor)
        if on_pageloaded_success:
            on_pageloaded_success(page)
        pages += page
    return json.dumps(pages)
