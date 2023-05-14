from typing import Any

from fastapi import Request

from app.main.utils.database.languages import get_languages
from app.main.utils.database.projects import get_project, get_projects
from app.main.utils.database.search_projects import (get_search_projects,
                                                     post_search_projects)
from app.main.utils.database.search_users import (get_search_users,
                                                  post_search_users)
from app.main.utils.database.users import get_user, get_users
from manage import app


# Ex : /users?count=<count>
@app.get("/users")
async def all_users(count: int=20) -> dict :
    """This method will return all github users with filter"""
    return get_users(count)


# Ex : /users/elhmne
@app.get("/users/<user_name>")
async def user_infos_username(user_name: str) -> dict :
    """This method will return a github user with more informations"""
    return get_user(user_name)


# Ex : /users/search?query=<query_string>&count=<element_per_page>&page=<page_number>
@app.get("/users/search")
async def search_users(query: str, count: int=20, page: int=1) -> dict :
    """
    This request will return the list of users that
    match the query string
    """
    return get_search_users(
        query=query,
        count=count,
        page=page
    )


@app.post("/users/search")
async def user_search_infos(request: Request) -> dict :
    """This request will return all github users that matches search query field"""
    request_json: dict[str, Any] = await request.json() or {}

    return post_search_users(
        query=request_json.get("query", ""),
        sort_type=request_json.get("sort_type", ""),
        page=request_json.get("page", 1),
        count=request_json.get("count", 20)
    )


# Ex : /projects?count=<count>
@app.get("/projects")
async def all_projects(count: int=20) -> dict :
    """This request will return all github projects"""
    return get_projects(count)


@app.get("/projects")
async def user_infos_project(project_name: str) -> dict :
    """This request will return a github project by name"""
    return get_project(project_name)


# Ex : /projects/search?query=<query_string>&count=<element_per_page>&page=<page_number>
@app.get("/projects/search")
async def project_search(query: str, count: int=20, page: int=1) -> dict :
    """
    This request will return all github projects
    that matches search query field
    """
    return get_search_projects(
        query=query,
        count=count,
        page=page
    )


@app.post("/projects/search")
async def project_search_infos(request: Request) -> dict :
    """
    This request will return all github projects
    that matches search query field
    """
    request_json = await request.json()

    return post_search_projects(
        query=request_json.get("query", ""),
        sort_type=request_json.get("sort_type", ""),
        languages=request_json.get("languages", []),
        page=request_json.get("page", 1),
        count=request_json.get("count", 20)
    )


# Ex : /languages
@app.get("/languages")
async def github_languages() -> dict :
    """This request will return a list of github languages"""
    return get_languages()
