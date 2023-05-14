# settings.py
# All settings/parameter for the application
import os
from typing import Any


def get_conf(key: str, fallback: Any = "") -> str:
    """
    Get a conf .env param from OS or fallback on default
    params : key
    return : value
    """

    return os.environ.get(key, default=fallback)

# database configurations
OSS_WEBSITE_APP_DATABASE = get_conf('OSS_WEBSITE_APP_DATABASE', 'ossdb')
OSS_WEBSITE_APP_HOST     = get_conf('OSS_WEBSITE_APP_HOST', "localhost")
OSS_WEBSITE_APP_PORT     = get_conf('OSS_WEBSITE_APP_PORT', 5432)
OSS_WEBSITE_APP_USER     = get_conf('OSS_WEBSITE_APP_USER', 'user')
OSS_WEBSITE_APP_PASSWORD = get_conf('OSS_WEBSITE_APP_PASSWORD', 'pwd')

# Twitter configurations
TWITTER_API_KEY = get_conf("TWITTER_API_KEY")
TWITTER_API_SECRET_KEY = get_conf("TWITTER_API_SECRET_KEY")
