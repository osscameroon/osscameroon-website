# database utils functions
from app.main.utils.database import storage
from app.settings import MEILISEARCH_MASTER_KEY, MEILISEARCH_HOST
import meilisearch
import datetime
import time
import json


SORT_TYPE_MOST_RECENT = "most_recent"
SORT_TYPE_ALPHABETIC = "alphabetic"

def get_search_users(query: str, count: int = 20, page: int = 1):
    """
    get_search_users [this method search for users in our datastore

    @params : query, count, page
    @returns : - code : the status code of the request
               - status the status string of the request
               - result the result of that request
    """

    offset = (page - 1) * count

    client = meilisearch.Client(MEILISEARCH_HOST, MEILISEARCH_MASTER_KEY)
    index = client.get_index(storage.KIND_USERS)
    ret = index.search(
        storage.KIND_USERS, {"q": query, "limit": count, "offset": offset}
    )
    if not ret or len(ret) < 1:
        return {"code": 400, "reason": "nothing found"}

    response = {
        "code": 200,
        "status": "success",
        "result": ret,
    }

    return response

def alphabetic_sort(item):
    return item.get("login").lower()


def most_recent_sort(item):
    # convert created_at to timestamp in second
    date_str = item.get("created_at")
    date = datetime.datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ")
    time_tuple = date.timetuple()
    return time.mktime(time_tuple)


def sort_result_by(sort_type: str, items: list = []):
    if sort_type == SORT_TYPE_ALPHABETIC:
        items.sort(key=alphabetic_sort)
    elif sort_type == SORT_TYPE_MOST_RECENT:
        items.sort(key=most_recent_sort, reverse=True)

    return items


def post_search_users(
    query: str,
    sort_type: str = "",
    count: int = 20,
    page: int = 1,
):
    """
    post_search_users [this method search for users in our datastore

    @params : query, count, page
    @returns : - code : the status code of the request
               - status the status string of the request
               - result the result of that request
    """

    offset = (page - 1) * count
    client = meilisearch.Client(MEILISEARCH_HOST, MEILISEARCH_MASTER_KEY)
    index = client.get_index(storage.KIND_USERS)

    # if sort_type is not specified or not supported
    if sort_type not in [
        SORT_TYPE_ALPHABETIC,
        SORT_TYPE_MOST_RECENT,
    ]:
        query_object = {"q": query, "limit": count, "offset": offset}
        ret = index.search(
            storage.KIND_USERS,
            query_object,
        )
        if not ret or len(ret) < 1:
            return {"code": 400, "reason": "nothing found"}
        ret["hits"] = sort_result_by(sort_type, ret["hits"])
    # if sort_type is specified we fetch every single elements and sort them handle the pagination on the application level
    else:
        query_object = {"q": query, "limit": 1500}
        ret = index.search(storage.KIND_USERS, query_object)
        if not ret or len(ret) < 1:
            return {"code": 400, "reason": "nothing found"}
        ret["hits"] = sort_result_by(sort_type, ret["hits"])
        ret["hits"] = ret["hits"][offset:offset + count]
        ret["offset"] = offset
        ret["limit"] = count

    response = {
        "code": 200,
        "status": "success",
        "result": ret,
    }

    return response
