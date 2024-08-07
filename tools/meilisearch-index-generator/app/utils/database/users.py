import json

USERS_FILE = './data/users.json'

def fetch_all_users():
    data = []
    # Read data from file and return it
    with open(USERS_FILE, 'r') as f:
        data = json.load(f)

    return data
