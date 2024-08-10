# database utils functions
from app.main.utils.database import storage
from app.settings import MEILISEARCH_MASTER_KEY, MEILISEARCH_HOST
import meilisearch
import datetime
import time

SORT_TYPE_POPULARITY = "popularity"
SORT_TYPE_MOST_RECENT = "most_recent"
SORT_TYPE_ALPHABETIC = "alphabetic"

def get_search_projects(query: str, count: int = 20, page: int = 1):
    """
    get_search_projects [this method search for projects in our datastore

    @params : query, count, page
    @returns : - code : the status code of the request
               - status the status string of the request
               - result the result of that request
    """

    offset = (page - 1) * count

    client = meilisearch.Client(MEILISEARCH_HOST, MEILISEARCH_MASTER_KEY)
    client.index(storage.KIND_PROJECTS).update_pagination_settings({'maxTotalHits': 5000})
    index = client.get_index(storage.KIND_PROJECTS)
    ret = index.search(
        storage.KIND_PROJECTS, {"q": query, "limit": count, "offset": offset}
    )
    if not ret or len(ret) < 1:
        return {"code": 400, "reason": "nothing found"}

    ret["nbHits"] = ret["estimatedTotalHits"]

    response = {
        "code": 200,
        "status": "success",
        "result": ret,
    }

    return response


def build_project_filters(languages):
    if len(languages) <= 0:
        return ""

    langs = ""
    len_lang = len(languages)
    for i in range(len_lang):
        langs += f'language = "{languages[i]}"'
        if i != len_lang - 1:
            langs += " "
    filters = langs
    return filters


def alphabetic_sort(item):
    return item.get("name").lower()


def popularity_sort(item):
    return item.get("stargazers_count")


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
    elif sort_type == SORT_TYPE_POPULARITY:
        items.sort(key=popularity_sort, reverse=True)

    return items


def post_search_projects(
    query: str,
    languages: list = [],
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
    filters = build_project_filters(languages)
    client = meilisearch.Client(MEILISEARCH_HOST, MEILISEARCH_MASTER_KEY)
    client.index(storage.KIND_PROJECTS).update_pagination_settings({'maxTotalHits': 5000})

    index = client.get_index(storage.KIND_PROJECTS)

    # if sort_type is not specified or not supported
    if sort_type not in [
        SORT_TYPE_ALPHABETIC,
        SORT_TYPE_MOST_RECENT,
        SORT_TYPE_POPULARITY,
    ]:
        query_object = {"q": query, "limit": count, "offset": offset}
        if filters != "":
            query_object["q"] += " " + filters
        ret = index.search(
            storage.KIND_PROJECTS,
            query_object,
        )
        if not ret or len(ret) < 1:
            return {"code": 400, "reason": "nothing found"}
        ret["hits"] = sort_result_by(sort_type, ret["hits"])
    # if sort_type is specified we fetch every single elements and sort them handle the pagination on the application level
    else:
        query_object = {"q": query, "limit": 1000}
        if filters != "":
            query_object["q"] += " " + filters
        ret = index.search(storage.KIND_PROJECTS, query_object)
        if not ret or len(ret) < 1:
            return {"code": 400, "reason": "nothing found"}
        ret["hits"] = sort_result_by(sort_type, ret["hits"])
        ret["hits"] = ret["hits"][offset:offset + count]
        ret["offset"] = offset
        ret["limit"] = count

    ret["nbHits"] = ret["estimatedTotalHits"]

    response = {
        "code": 200,
        "status": "success",
        "result": ret,
    }

    return response
