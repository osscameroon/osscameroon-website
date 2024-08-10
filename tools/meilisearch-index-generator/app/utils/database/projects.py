import json

PROJECTS_FILE = './data/projects.json'

def fetch_all_projects():
    data = []
    # Read data from file and return it
    with open(PROJECTS_FILE, 'r') as f:
        data = json.load(f)

    return data
