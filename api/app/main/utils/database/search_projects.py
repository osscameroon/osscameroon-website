# database utils functions

from app.settings import get_connection


async def get_search_projects(query: str, count: int = 20, page: int = 1):
    offset = (page - 1) * count
    conn = await get_connection()

    assert conn is not None

    try:
        ret = conn.fetch(
            'SELECT * FROM projects WHERE name LIKE $1 LIMIT $2 OFFSET $3',
            f"%{query}%", count, offset
        )
    finally:
        conn.close()

    if not ret or len(ret) < 1:
        return {"code": 400, "reason": "nothing found"}

    return {
        "code": 200,
        "status": "success",
        "result": ret,
    }

async def post_search_projects(
    query: str,
    languages: list[str] = [],
    sort_type: str = "",
    count: int = 20,
    page: int = 1
):
    offset = (page - 1) * count
    conn = await get_connection()

    try:
        if sort_type == 'alphabetic':
            ret = conn.fetch(
                'SELECT * FROM projects WHERE name LIKE $1 AND '
                'language = ANY($2) ORDER BY name LIMIT $3 OFFSET $4',
                f"%{query}%", languages, count, offset
            )
        elif sort_type == 'most_recent':
            ret = conn.fetch(
                'SELECT * FROM projects WHERE name LIKE $1 AND '
                'language = ANY($2) ORDER BY created_at DESC LIMIT $3 OFFSET $4',
                f"%{query}%", languages, count, offset
            )
        elif sort_type == 'popularity':
            ret = conn.fetch(
                'SELECT * FROM projects WHERE name LIKE $1 AND '
                'language = ANY($2) ORDER BY stargazers_count DESC LIMIT $3 OFFSET $4',
                f"%{query}%", languages, count, offset
            )
        else:
            ret = conn.fetch(
                'SELECT * FROM projects WHERE name LIKE $1 AND '
                'language = ANY($2) LIMIT $3 OFFSET $4',
                f"%{query}%", languages, count, offset
            )
    finally:
        conn.close()

    if not ret or len(ret) < 1:
        return {"code": 400, "reason": "nothing found"}

    return {
        "code": 200,
        "status": "success",
        "result": ret,
    }
