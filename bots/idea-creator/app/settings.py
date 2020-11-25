import configparser as Configparser

conf = Configparser.RawConfigParser()
conf_path = r'config.txt'
conf.read(conf_path)

# Authentication for user filing issue (must have read/write access to
# repository to add issue to)
GITHUB_TOKEN = conf.get("ic", "GITHUB_TOKEN")

# The repository to add this issue to
REPO_OWNER = 'osscameroon'
REPO_NAME = 'caparledev-website'

HOST = 'https://api.github.com'
