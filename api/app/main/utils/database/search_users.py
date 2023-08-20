# database utils functions

from app.settings import get_connection


async def get_user(username: str) -> dict:
    conn = await get_connection()

    try:
        ret = await conn.fetch(
            'SELECT * FROM users WHERE login LIKE $1', username
        )
    finally:
        await conn.close()

    if not ret or len(ret) < 1:
        return {"code": 400, "reason": "nothing found"}

    return ret

async def get_users(count: int) -> dict:
    conn = await get_connection()
    try:
        ret = conn.fetch(
            'SELECT * FROM users LIMIT $1', count
        )
    finally:
        await conn.close()

    if not ret or len(ret) < 1:
        return {"code": 400, "reason": "nothing found"}

    return ret


async def get_search_users(query: str, count: int = 20, page: int = 1):
    offset = (page - 1) * count
    conn = await get_connection()

    try:
        ret = await conn.fetch(
            'SELECT * FROM users WHERE login LIKE $1 LIMIT $2 OFFSET $3',
            f"%{query}%", count, offset
        )
    finally:
        await conn.close()

    if not ret or len(ret) < 1:
        return {"code": 400, "reason": "nothing found"}

    return ret


async def post_search_users(
    query: str,
    sort_type: str = "",
    count: int = 20,
    page: int = 1
):
    offset = (page - 1) * count
    conn = await get_connection()

    try:
        if sort_type == 'alphabetic':
            ret = conn.fetch(
                'SELECT * FROM users WHERE login LIKE $1 '
                'ORDER BY login LIMIT $2 OFFSET $3',
                f"%{query}%", count, offset
            )
        elif sort_type == 'most_recent':
            ret = conn.fetch(
                'SELECT * FROM users WHERE login LIKE $1 '
                'ORDER BY created_at DESC LIMIT $2 OFFSET $3',
                f"%{query}%", count, offset
            )
        else:
            ret = conn.fetch(
                'SELECT * FROM users WHERE login LIKE $1 '
                'LIMIT $2 OFFSET $3',
                f"%{query}%", count, offset
            )
    finally:
        conn.close()

    if not ret or len(ret) < 1:
        return {"code": 400, "reason": "nothing found"}

    return ret
