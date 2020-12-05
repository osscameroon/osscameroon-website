# settings.py
# All settings/parameter for the application
import configparser as cf
import os

# we read configuration from the config.txt file
conf = cf.RawConfigParser()
conf.read(r'config.txt')

def get_github_token():
    token = conf.get("githubscraper", "GITHUB_TOKEN")
    if token == "":
        token = os.environ.get("GITHUB_TOKEN")
    return token

def get_github_api():
    api = conf.get("githubscraper", "GITHUB_API")
    if api == "":
        api = os.environ.get("GITHUB_API")
    return api


# we get those secrets value
GITHUB_API = get_github_api()
GITHUB_TOKEN = get_github_token()
