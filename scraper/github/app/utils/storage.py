import datetime
import json
from app.settings import MONGO_DATABASE, MONGO_LINK

from pymongo import MongoClient


KIND_USERS = "github_users"
KIND_PROJECTS = "github_projects"
__CLIENT = None


def __get_client():
    global __CLIENT
    if __CLIENT is None:
        __CLIENT = MongoClient(MONGO_LINK).get_database(MONGO_DATABASE)
    return __CLIENT


def get_collection(collection_name: str):
    """Get a Mongo collection object from mongo"""
    global __CLIENT

    if __CLIENT:
        return __CLIENT.get_collection(collection_name)

    raise Exception(f"No client set for the collection {collection_name}")


def store_user(user: dict):
    """
    Stores user data in our gcp datastore server

    @params : user data
    """

    if not user:
        return

    client = __get_client()

    user_collection = client.get_collection(KIND_USERS)
    if user_collection.find_one({"login": user["login"]}) is not None:
        user_collection.update_one({"login": user["login"]}, user)

    user_collection.insert_one(user)


def store_project(repo: dict):
    """
    Stores open source project in our gcp datastore server

    @params : open source repo
    """

    if not repo:
        return

    client = __get_client()

    user_project = client.get_collection(KIND_PROJECTS)
    if user_project.find_one({"name": repo["name"]}) is not None:
        user_project.update_one({"name": repo["name"]}, repo)

    user_project.insert_one(repo)


def get_one_page_of_users(cursor=None, limit: int = 20):
    client = __get_client()
    query = client.query(kind=KIND_USERS)
    query_iter = query.fetch(start_cursor=cursor, limit=limit)
    page = next(query_iter.pages)

    result = list(page)
    # converts top level field of type datetime to string
    for data in result:
        for key, val in data.items():
            if isinstance(val, (datetime.date, datetime.datetime)):
                data[key] = val.strftime("%Y-%m-%dT%H:%M:%SZ")

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
