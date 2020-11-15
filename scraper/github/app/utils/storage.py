from google.cloud import datastore
import datetime

# For the gcloud auth to work properly this env variable should be set
# GOOGLE_APPLICATION_CREDENTIALS=.secrets/service-account.json

DATA_KIND = "github_users"
__CLIENT = None

def __get_client():
    global __CLIENT
    if __CLIENT is None:
        __CLIENT = datastore.Client()
    return __CLIENT

def store_user(user: dict):
    """
        Stores user data in our gcp datastore server

        @params : user data
    """

    if not user:
        return

    client = __get_client()
    key = client.key(DATA_KIND, user["id"])
    data = datastore.Entity(key)
    data.update(user)
    client.put(data)
