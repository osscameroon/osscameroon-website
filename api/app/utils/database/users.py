# database utils functions
from app.utils.database import storage
import json

def get_users(pagination_limit, count: int):
    """
    get_users [this method fetch dev users from the database]

    @params : pagination_limit, count
    @returns : - code : the status code of the request
               - status the status string of the request
               - result the result of that request
    """

    if count is None:
        count = 100

    client = storage.get_client()
    query = client.query(kind=storage.DATA_KIND)
    result = list(query.fetch(limit=count))

    if not result or len(result) < 1:
        return {
            "code": 400
        }

    response = {
        "code": 200,
        "status": "success",
        "result": result,
    }

    return response


def get_user(user_name: str):
    """
    get_user[this method fetch dev user's information
    from the database]

    @params : user_name
    @returns : Object reponse for the github user infos

    """

    client = storage.get_client()
    query = client.query(kind=storage.DATA_KIND)
    query = query.add_filter("login", "=", user_name)
    result = list(query.fetch())

    if not result or len(result) < 1:
        return {
            "code": 400
        }

    response = {
        "code": 200,
        "status": "success",
        "result": result[0]
    }

    return response
