from google.cloud import datastore
import datetime

# For the gcloud auth to work properly this env variable should be set
# GOOGLE_APPLICATION_CREDENTIALS=.secrets/service-account.json

DATA_KIND = "github_users"
__CLIENT = None


def request_failed(ret):
    return ret and "status" in ret and ret["status"] == "error"


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


def get_github_users():
    client = __get_client()
    query = client.query(kind=DATA_KIND)
    result = list(query.fetch())

    if not result or len(result) < 1:
        return {"code": 400, "reason": "nothing found"}

    result = sanitize_array_of_user_data(result)

    response = {
        "code": 200,
        "status": "success",
        "result": result,
    }

    return response
