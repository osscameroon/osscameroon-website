# settings.py
# All settings/parameter for the application
import os
from typing import Any

import asyncpg


def get_conf(key: str, fallback: Any = "") -> str:
    """
    Get a conf .env param from OS or fallback on default
    params : key
    return : value
    """

    return os.environ.get(key, default=fallback)

# database configurations
OSS_WEBSITE_APP_USER     = get_conf('POSTGRES_USER', 'user')
OSS_WEBSITE_APP_PASSWORD = get_conf('POSTGRES_PASSWORD', 'pwd')
OSS_WEBSITE_APP_DATABASE = get_conf('POSTGRES_DB', 'ossdb')
OSS_WEBSITE_APP_HOST     = get_conf('DB_HOST', "localhost")
OSS_WEBSITE_APP_PORT     = get_conf('DB_PORT', 5432)

async def create_connection():
    # raise Exception('NOT WORKINGGGGGG !!')
    return await asyncpg.connect(
        user=OSS_WEBSITE_APP_USER,
        password=OSS_WEBSITE_APP_PASSWORD,
        database=OSS_WEBSITE_APP_DATABASE,
        host=OSS_WEBSITE_APP_HOST,
        port=OSS_WEBSITE_APP_PORT
    )
