import argparse
import json
from app.utils.storage import store_user, store_project


if __name__ == "__main__":
    # Usage :
    # - setup-datastore:
    #   python3 -m app.cli
    with open('./fixtures/users.json') as file:
        data = json.load(file)
        for d in data:
            print("storing ", d["login"], "data...")
            store_user(d)
            print(d["login"], "data stored!\n")

    with open('./fixtures/projects.json') as file:
        data = json.load(file)
        for d in data:
            print("storing ", d["name"], " project data...")
            store_project(d)
            print(d["name"], "data project stored!\n")
