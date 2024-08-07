from app.utils.database import storage
from app.utils.database.users import fetch_all_users
from app.utils.database.projects import fetch_all_projects
import json
import sys
import os
from app.settings import MEILISEARCH_MASTER_KEY, MEILISEARCH_HOST
import meilisearch

def create_github_users_index():
    ret = fetch_all_users()

    print(MEILISEARCH_HOST, MEILISEARCH_MASTER_KEY)
    client = meilisearch.Client(MEILISEARCH_HOST, MEILISEARCH_MASTER_KEY)
    try:
        client.get_index(storage.KIND_USERS)
    except Exception as e:
        client.create_index(storage.KIND_USERS, {"primaryKey": "id"})
    client.index(storage.KIND_USERS).update_documents(ret)
    print("started updating github_users documents")


def create_github_projects_index():
    ret = fetch_all_projects()

    client = meilisearch.Client(MEILISEARCH_HOST, MEILISEARCH_MASTER_KEY)
    try:
        client.get_index(storage.KIND_PROJECTS)
    except Exception as e:
        client.create_index(storage.KIND_PROJECTS, {"primaryKey": "id"})
    client.index(storage.KIND_PROJECTS).update_documents(ret)
    print("started updating github_projects documents")

if __name__ == "__main__":
    # Usage :
    # python3 -m cli.main
    create_github_users_index()
    create_github_projects_index()
