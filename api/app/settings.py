# settings.py
# All settings/parameter for the application
import os
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

async def get_connection():
    global __PG_CONNECTION

    if __PG_CONNECTION is None:
        __PG_CONNECTION = await asyncpg.connect(
            user=get_conf('POSTGRES_USER', 'user'),
            password=get_conf('POSTGRES_PASSWORD', 'pwd'),
            database=get_conf('POSTGRES_DB', 'ossdb'),
            host=get_conf('DB_HOST', 'localhost'),
            port=get_conf('DB_PORT', 5432)
        )
    try:
        yield __PG_CONNECTION
    finally:
        await __PG_CONNECTION.close() #type:ignore
