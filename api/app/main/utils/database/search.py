# database utils functions
from app.main.utils.database import storage
from app.settings import MEILISEARCH_MASTER_KEY, MEILISEARCH_HOST
import meilisearch
import json

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
    ret = index.search(storage.KIND_USERS, {"q": query, "limit": count, "offset": offset})
    if not ret or len(ret) < 1:
        return {"code": 400, "reason": "nothing found"}

    response = {
        "code": 200,
        "status": "success",
        "result": ret,
    }

    return response

def get_search_projects(query: str, count: int = 20, page: int = 1):
    """
    get_search_users [this method search for users in our datastore

    @params : query, count, page
    @returns : - code : the status code of the request
               - status the status string of the request
               - result the result of that request
    """

    offset = (page - 1) * count

    client = meilisearch.Client(MEILISEARCH_HOST, MEILISEARCH_MASTER_KEY)
    index = client.get_index(storage.KIND_PROJECTS)
    ret = index.search(storage.KIND_PROJECTS, {"q": query, "limit": count, "offset": offset})
    if not ret or len(ret) < 1:
        return {"code": 400, "reason": "nothing found"}

    response = {
        "code": 200,
        "status": "success",
        "result": ret,
    }

    return response
