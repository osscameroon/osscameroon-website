import configparser as cf

conf = cf.RawConfigParser()
conf.read(r'config.txt')

COOKIE = conf.get("tscrap", "COOKIE")
ACCOUNT = {
    "username": "caparledev",
    "cookie": COOKIE
}

HOST = "https://analytics.twitter.com/user/caparledev/home"
