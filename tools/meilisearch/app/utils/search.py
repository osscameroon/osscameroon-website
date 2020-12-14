# database utils functions
from app.utils.database import storage
import json


def search_global(content: str, count: int = 100):
    """
    get_search [this method search for content in our database]

    @params : content, count
    @returns : - code : the status code of the request
               - status the status string of the request
               - result the result of that request
    """

    client = storage.get_client()
    query = client.query(kind=storage.data_kind)
    result = list(query.fetch())

    if not result or len(result) < 1:
        return {"code": 400, "reason": "nothing found"}

    response = {
        "code": 200,
        "status": "success",
        "result": result,
    }

    return response
