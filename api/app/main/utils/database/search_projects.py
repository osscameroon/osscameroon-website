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

async def get_search_projects(pool, query: str, count: int = 20, page: int = 1):
    offset = (page - 1) * count
    conn = await pool.acquire()

    try:
        ret = await conn.fetch(
            'SELECT * FROM projects WHERE name LIKE $1 LIMIT $2 OFFSET $3',
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

async def post_search_projects(
    pool,
    query: str,
    languages: list[str] = [],
    sort_type: str = "",
    count: int = 20,
    page: int = 1
):
    offset = (page - 1) * count
    conn = await pool.acquire()

    try:
        if sort_type == 'alphabetic':
            ret = await conn.fetch(
                'SELECT * FROM projects WHERE name LIKE $1 AND '
                'language = ANY($2) ORDER BY name LIMIT $3 OFFSET $4',
                f"%{query}%", languages, count, offset
            )
        elif sort_type == 'most_recent':
            ret = await conn.fetch(
                'SELECT * FROM projects WHERE name LIKE $1 AND '
                'language = ANY($2) ORDER BY created_at DESC LIMIT $3 OFFSET $4',
                f"%{query}%", languages, count, offset
            )
        elif sort_type == 'popularity':
            ret = await conn.fetch(
                'SELECT * FROM projects WHERE name LIKE $1 AND '
                'language = ANY($2) ORDER BY stargazers_count DESC LIMIT $3 OFFSET $4',
                f"%{query}%", languages, count, offset
            )
        else:
            ret = await conn.fetch(
                'SELECT * FROM projects WHERE name LIKE $1 AND '
                'language = ANY($2) LIMIT $3 OFFSET $4',
                f"%{query}%", languages, count, offset
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
