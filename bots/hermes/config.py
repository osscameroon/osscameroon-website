from configparser import ConfigParser

config = ConfigParser()
config.read('./.secrets/secrets.ini')

def get_config():
    return config