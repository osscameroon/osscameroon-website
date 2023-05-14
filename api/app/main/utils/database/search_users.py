# database utils functions
import asyncpg

from app.settings import (OSS_WEBSITE_APP_DATABASE, OSS_WEBSITE_APP_HOST,
                          OSS_WEBSITE_APP_PASSWORD, OSS_WEBSITE_APP_PORT,
                          OSS_WEBSITE_APP_USER)


async def create_pool():
    return await asyncpg.create_pool(
        user=OSS_WEBSITE_APP_USER,
        password=OSS_WEBSITE_APP_PASSWORD,
        database=OSS_WEBSITE_APP_DATABASE,
        host=OSS_WEBSITE_APP_HOST,
        port=OSS_WEBSITE_APP_PORT
    )

async def get_search_users(pool, query: str, count: int = 20, page: int = 1):
    offset = (page - 1) * count
    conn = await pool.acquire()

    try:
        ret = await conn.fetch(
            'SELECT * FROM users WHERE name LIKE $1 LIMIT $2 OFFSET $3',
            f"%{query}%", count, offset
        )
    finally:
        await pool.release(conn)

    if not ret or len(ret) < 1:
        return {"code": 400, "reason": "nothing found"}

    response = {
        "code": 200,
        "status": "success",
        "result": ret,
    }

    return response

async def post_search_users(
    pool,
    query: str,
    sort_type: str = "",
    count: int = 20,
    page: int = 1
):
    offset = (page - 1) * count
    conn = await pool.acquire()

    try:
        if sort_type == 'alphabetic':
            ret = await conn.fetch(
                'SELECT * FROM users WHERE name LIKE $1 '
                'ORDER BY name LIMIT $2 OFFSET $3',
                f"%{query}%", count, offset
            )
        elif sort_type == 'most_recent':
            ret = await conn.fetch(
                'SELECT * FROM users WHERE name LIKE $1 '
                'ORDER BY created_at DESC LIMIT $2 OFFSET $3',
                f"%{query}%", count, offset
            )
        else:
            ret = await conn.fetch(
                'SELECT * FROM users WHERE name LIKE $1 '
                'LIMIT $2 OFFSET $3',
                f"%{query}%", count, offset
            )
    finally:
        await pool.release(conn)

    if not ret or len(ret) < 1:
        return {"code": 400, "reason": "nothing found"}

    response = {
        "code": 200,
        "status": "success",
        "result": ret,
    }

    return response
