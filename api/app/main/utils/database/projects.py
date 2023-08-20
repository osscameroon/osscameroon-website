# database utils functions

from app.main.utils import converters
from app.settings import get_connection


def sanitize_project_data(data):
    """
    sanitize_project_data [prepare project data format]
    @params: data
    """

    return converters.convert_datetime_fields_to_string(data)


def sanitize_array_of_project_data(data_arr: list):
    """
    sanitize_array_of_project_data [prepare array of project data format]
    @params: data_arr
    """
    for data in data_arr:
        data = sanitize_project_data(data)
    return data_arr


async def get_project(projectname: str) -> dict:
    conn = await get_connection()

    try:
        ret = await conn.fetch(
            'SELECT * FROM projects WHERE name = $1', projectname
        )
    finally:
        await conn.close()

    if not ret or len(ret) < 1:
        return {"code": 400, "reason": "nothing found"}

    return ret


async def get_projects(offset: int, limit: int) -> dict:
    conn = await get_connection()

    try:
        ret = conn.fetch(
            'SELECT * FROM projects LIMIT $1 OFFSET $2', limit, offset
        )
    finally:
        await conn.close()

    if not ret or len(ret) < 1:
        return {"code": 400, "reason": "nothing found"}

    return ret
