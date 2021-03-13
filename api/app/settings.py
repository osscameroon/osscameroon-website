# settings.py
# All settings/parameter for the application
import configparser as cf
import os

# we read configuration from the config.txt file
conf = cf.RawConfigParser()
conf.read(r'config.txt')


def get_conf(context: str, key: str) -> str:
    """
    A simple method to get a configuration parameter
    from the configuration file
    or just pick it on the os environment

    params : context, key
    return : value
    """
    value = ""
    if context in conf:
        value = conf.get(context, key, fallback="")
    if value == "":
        value = os.environ.get(key)
    return value


# meili configurations
MEILISEARCH_HOST = get_conf("meilisearch", "MEILISEARCH_HOST")
MEILISEARCH_MASTER_KEY = get_conf("meilisearch", "MEILISEARCH_MASTER_KEY")

# Twitter configurations
API_KEY = get_conf("twitter", "API_KEY")
API_SECRET_KEY = get_conf("twitter", "API_SECRET_KEY")
