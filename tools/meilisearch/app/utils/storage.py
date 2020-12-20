from google.cloud import datastore

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


def get_github_users():
    client = __get_client()
    query = client.query(kind=DATA_KIND)
    result = list(query.fetch())

    if not result or len(result) < 1:
        return {"code": 400, "reason": "nothing found"}

    response = {
        "code": 200,
        "status": "success",
        "result": result,
    }

    return response
