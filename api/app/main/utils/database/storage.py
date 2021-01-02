from google.cloud import datastore

# For the gcloud auth to work properly this env variable should be set
# GOOGLE_APPLICATION_CREDENTIALS=.secrets/service-account.json

KIND_USERS = "github_users"
KIND_PROJECTS = "github_projects"
__CLIENT = None


def get_client():
    global __CLIENT
    if __CLIENT is None:
        __CLIENT = datastore.Client()
    return __CLIENT
