# settings.py
# All settings/parameter for the application
import configparser as cf
import os

# we read configuration from the config.txt file
conf = cf.RawConfigParser()
conf.read(r'config.txt')

def get_meilisearch_host():
    host = conf.get("meilisearch", "MEILISEARCH_HOST")
    if host == "":
        host = os.environ.get("MEILISEARCH_HOST")
    return host

def get_meilisearch_master_key():
    key = conf.get("meilisearch", "MEILISEARCH_MASTER_KEY")
    if key == "":
        key = os.environ.get("MEILISEARCH_MASTER_KEY")
    return key


# we get those secrets value
MEILISEARCH_HOST = get_meilisearch_host()
MEILISEARCH_MASTER_KEY = get_meilisearch_master_key()
