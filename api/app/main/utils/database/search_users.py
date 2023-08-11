# database utils functions

from app.settings import create_connection


async def get_search_users(query: str, count: int = 20, page: int = 1):
    offset = (page - 1) * count
    conn = await create_connection()

    try:
        ret = await conn.fetch(
            'SELECT * FROM users WHERE name LIKE $1 LIMIT $2 OFFSET $3',
            f"%{query}%", count, offset
        )
    finally:
        await conn.close()

    if not ret or len(ret) < 1:
        return {"code": 400, "reason": "nothing found"}

    return {
        "code": 200,
        "status": "success",
        "result": ret,
    }

async def post_search_users(
    query: str,
    sort_type: str = "",
    count: int = 20,
    page: int = 1
):
    offset = (page - 1) * count
    conn = await create_connection()

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
        await conn.close()

    if not ret or len(ret) < 1:
        return {"code": 400, "reason": "nothing found"}

    return {
        "code": 200,
        "status": "success",
        "result": ret,
    }
