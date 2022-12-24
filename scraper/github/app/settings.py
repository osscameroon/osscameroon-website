import configparser as cf
from os import environ as os_env


_SCOPE = 'githubscraper'

def get_key_env(scope: str, key: str) -> str | None:
    # we read configuration from the config.txt file
    conf = cf.RawConfigParser()
    conf.read(r'config.txt')

    try:
        if env := conf.get(scope, key):
            return env

        return os_env.get(key)
    except cf.NoOptionError:
        return ""


# we get those secrets value
GITHUB_API = get_key_env(_SCOPE, 'GITHUB_API')
GITHUB_TOKEN = get_key_env(_SCOPE, 'GITHUB_TOKEN')

# Some database envs
MONGO_LINK = get_key_env(_SCOPE, 'MONGO_LINK')
MONGO_DATABASE = get_key_env(_SCOPE, 'MONGO_DATABASE')
