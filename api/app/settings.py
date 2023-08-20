# settings.py
# All settings/parameter for the application
import os
from functools import lru_cache
from typing import Any

import asyncpg

__PG_CONNECTION = None

def get_conf(key: str, fallback: Any = "") -> str:
    """
    Get a conf .env param from OS or fallback on default
    params : key
    return : value
    """

    return os.environ.get(key, default=fallback)

@lru_cache(maxsize=1)
async def get_connection():
    user=get_conf('POSTGRES_USER', 'user')
    password=get_conf('POSTGRES_PASSWORD', 'pass')
    database=get_conf('POSTGRES_DB', 'ossdb')
    host=get_conf('DB_HOST', 'localhost')
    port=get_conf('DB_PORT', 5432)

    return await asyncpg.connect(
        user=        user,
        password=        password,
        database=        database,
        host=        host,
        port=        port,
    )
