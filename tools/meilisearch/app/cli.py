from app.utils.storage import get_github_users, request_failed
import json
import sys
import os
import meilisearch

INDEX_UID = "github_users"
HOST = "http://127.0.0.1:7700"

if __name__ == "__main__":
    # Usage :
    # python3 -m cli.main
    ret = get_github_users()

    if request_failed(ret):
        print("Error: request failed: ", ret)
        sys.exit(1)

    client = meilisearch.Client(HOST, os.getenv("MEILISEARCH_MASTER_KEY"))
    try:
        index = client.create_index(INDEX_UID, {"primaryKey": "id"})
    except Exception as e:
        index = client.get_index(INDEX_UID)
        print("error: ", e)
    finally:
        print("updating documents")
        index.update_documents(ret["result"])
