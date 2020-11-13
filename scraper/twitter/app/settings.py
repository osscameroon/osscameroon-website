import configparser as Configparser

conf = Configparser.RawConfigParser()
conf_path = r'config.txt'
conf.read(conf_path)

COOKIE = conf.get("tscrap", "COOKIE")
ACCOUNT = {
    "username": "caparledev",
    "cookie": COOKIE
}

HOST = "https://analytics.twitter.com/user/caparledev/home"
