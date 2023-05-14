# database utils functions

from app.main.utils import converters
from app.main.utils.database import storage


def sanitize_user_data(data):
    """
    sanitize_user_data [prepare user data format]
    @params: data
    """

    data = converters.convert_datetime_fields_to_string(data)
    return data


def sanitize_array_of_user_data(data_arr: list):
    """
    sanitize_array_of_user_data [prepare array of user data format]
    @params: data_arr
    """
    for data in data_arr:
        data = sanitize_user_data(data)
    return data_arr


def get_users(count: int = 20):
    """
    get_users [this function fetch dev users from the database]
    the count of items returned by this function can be limited
    to the size of data the datastore is able to return

    @params : count
    @returns : - code : the status code of the request
               - status the status string of the request
               - result the result of that request
    """

    client = storage.get_client()
    query = client.query(kind=storage.KIND_USERS)
    result = list(query.fetch(limit=count))

    if not result or len(result) < 1:
        return {"code": 400, "reason": "nothing found"}

    result = sanitize_array_of_user_data(result)

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
    query = client.query(kind=storage.KIND_USERS)
    query = query.add_filter("login", "=", user_name)
    result = list(query.fetch())

    if not result or len(result) < 1:
        return {"code": 400, "reason": "nothing found"}

    result = sanitize_user_data(result[0])

    response = {"code": 200, "status": "success", "result": result}

    return response
