from google.cloud import datastore

KIND_USERS = "github_users"
KIND_PROJECTS = "github_projects"
__CLIENT = None


def get_client():
    global __CLIENT
    if __CLIENT is None:
        __CLIENT = datastore.Client()
    return __CLIENT
