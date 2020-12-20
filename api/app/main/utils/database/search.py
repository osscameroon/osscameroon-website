# database utils functions
from app.main.utils.database import storage
from app.settings import MEILISEARCH_MASTER_KEY, MEILISEARCH_HOST
import meilisearch
import json

INDEX_UID = "github_users"

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
    index = client.get_index(INDEX_UID)
    ret = index.search(INDEX_UID, {"q": query, "limit": count, "offset": offset})
    if not ret or len(ret) < 1:
        return {"code": 400, "reason": "nothing found"}

    response = {
        "code": 200,
        "status": "success",
        "result": ret,
    }

    return response
