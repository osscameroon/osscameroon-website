from app.utils.database import storage
from app.utils import converters


def sanitize_project_data(data):
    """
    sanitize_project_data [prepare project data format]
    @params: data
    """

    data = converters.convert_datetime_fields_to_string(data)
    return data


def sanitize_array_of_project_data(data_arr: list):
    """
    sanitize_array_of_project_data [prepare array of project data format]
    @params: data_arr
    """
    for data in data_arr:
        data = sanitize_project_data(data)
    return data_arr

def get_one_page_of_projects(cursor=None, limit: int = 100):
    client = storage.get_client()
    query = client.query(kind=storage.KIND_PROJECTS)
    query_iter = query.fetch(start_cursor=cursor, limit=limit)
    page = next(query_iter.pages)

    result = list(page)
    result = sanitize_array_of_project_data(result)

    next_cursor = query_iter.next_page_token
    return result, next_cursor

def fetch_all_projects(on_pageloaded_success=None):
    pages = []
    page, next_cursor = get_one_page_of_projects()
    if on_pageloaded_success:
        on_pageloaded_success(page)
    pages += page

    while next_cursor:
        page, next_cursor = get_one_page_of_projects(cursor=next_cursor)
        if on_pageloaded_success:
            on_pageloaded_success(page)
        pages += page
    return pages
