# database utils functions

from app.main.utils.database import storage
from app.main.utils import converters


def sanitize_project_data(data):
    """
    sanitize_project_data [prepare project data format]
    @params: data
    """

    data = converters.convert_datetime_fields_to_string(data)
    return data


def sanitize_array_of_project_data(data_arr: list):
    """
    sanitize_array_of_project_data [prepare array of project data format]
    @params: data_arr
    """
    for data in data_arr:
        data = sanitize_project_data(data)
    return data_arr


def get_one_page_of_projects(cursor=None, limit: int = 20):
    client = storage.get_client()
    query = client.query(kind=storage.KIND_PROJECTS)
    query_iter = query.fetch(start_cursor=cursor, limit=limit)
    page = next(query_iter.pages)

    result = list(page)
    result = sanitize_array_of_project_data(result)

    next_cursor = query_iter.next_page_token
    return result, next_cursor


def get_projects(count: int = 20):
    """
    get_users [this function fetch open source projects from the database]
    the count of items returned by this function can be limited to the size of data the datastore is able to return

    @params : count
    @returns : - code : the status code of the request
               - status the status string of the request
               - result the result of that request
    """

    client = storage.get_client()
    query = client.query(kind=storage.KIND_PROJECTS)
    result = list(query.fetch(limit=count))

    if not result or len(result) < 1:
        return {"code": 400, "reason": "nothing found"}

    result = sanitize_array_of_project_data(result)

    response = {
        "code": 200,
        "status": "success",
        "result": result,
    }

    return response

def get_project(project_name: str):
    """
    get_user[this method fetch dev user's information
    from the database]

    @params : user_name
    @returns : Object reponse for the github user infos

    """

    client = storage.get_client()
    query = client.query(kind=storage.KIND_PROJECTS)
    query = query.add_filter("name", "=", project_name)
    result = list(query.fetch())

    if not result or len(result) < 1:
        return {"code": 400, "reason": "nothing found"}

    result = sanitize_project_data(result[0])

    response = {"code": 200, "status": "success", "result": result}

    return response
