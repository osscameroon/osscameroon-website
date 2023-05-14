import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_precious_secret_key')
    DEBUG = False
    # app envs
    APP_HOST    = os.getenv('APP_HOST', '0.0.0.0')
    APP_PORT    = os.getenv('APP_PORT', '8811')
    APP_VERSION = os.getenv('APP_VERSION', '0.0.1')
    APP_NAME    = os.getenv('APP_NAME', 'CaParleDev-WebSite')

class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    DEBUG = True
    TESTING = True


class ProductionConfig(Config):
    DEBUG = False


config_by_name = dict(
    dev=DevelopmentConfig,
    test=TestingConfig,
    prod=ProductionConfig
)

key = Config.SECRET_KEY
app_port = Config.APP_PORT
app_host = Config.APP_HOST
