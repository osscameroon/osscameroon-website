# settings.py
# All settings/parameter for the application
import configparser as cf

# we read configuration from the config.txt file
conf = cf.RawConfigParser()
conf.read(r'config.txt')

# we get those secrets value
GITHUB_API = conf.get("githubscraper", "GITHUB_API")
GITHUB_TOKEN = conf.get("githubscraper", "GITHUB_TOKEN")
