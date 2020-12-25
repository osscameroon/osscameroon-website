from flask_restplus import Resource, fields
from flask import request, json
import datetime

# from app.main.utils.decorator import *
from app.main.utils.dto import ApiDto
from app.main.utils.database.users import get_users, get_user
from app.main.utils.database.projects import get_projects, get_project
from app.main.utils.database.search import (
    get_search_users,
    get_search_projects,
    post_search_projects,
)

api = ApiDto.api


# Ex : /users?count=<count>
@api.route("/users", methods=["GET"])
class ApidtoUsers(Resource):
    @api.doc("Get_all_users")
    def get(self):
        """This method will return all github users with filter"""

        count = request.args.get("count")
        if count is not None:
            count = int(count)
        else:
            count = 20

        result = get_users(count=count)

        return result, result["code"]


# Ex : /users/elhmne
@api.route("/users/<user_name>", methods=["GET"])
class ApidtoUser(Resource):
    @api.doc("Get_user_infos")
    def get(self, user_name):
        """This method will return a github user with more informations"""

        result = get_user(user_name)
        return result, result["code"]


# Ex : /users/search?query=<query_string>&count=<element_per_page>&page=<page_number>
@api.route("/users/search", methods=["GET"])
class ApidtoSearch(Resource):
    @api.doc(
        "Get_search_infos",
        params={
            "query": "query string can be a user name",
            "page": "page number",
            "count": "item count",
        },
    )
    def get(self):
        """This request will return the list of users that match the query string"""
        query = request.args.get("query")

        count = request.args.get("count")
        if count is not None:
            count = int(count)
        else:
            count = 20

        page = request.args.get("page")
        if page is not None:
            page = int(page)
        else:
            page = 1

        result = get_search_users(query, count, page)
        return result, result["code"]


# Ex : /projects/node-openerp
@api.route("/projects/<project_name>", methods=["GET"])
class ApidtoProject(Resource):
    @api.doc("Get_user_infos")
    def get(self, project_name):
        """This request will return a github project by name"""

        result = get_project(project_name)
        return result, result["code"]


# Ex : /projects?count=<count>
@api.route("/projects", methods=["GET"])
class ApidtoProjects(Resource):
    @api.doc(
        "Get_all_projects",
        params={
            "count": "item count",
        },
    )
    def get(self):
        """This request will return all github projects"""

        count = request.args.get("count")
        if count is not None:
            count = int(count)
        else:
            count = 20

        page = request.args.get("page")
        if page is not None:
            page = int(page)
        else:
            page = 1

        result = get_projects(count=count)

        return result, result["code"]


# Ex : /projects/search?query=<query_string>&count=<element_per_page>&page=<page_number>
@api.route("/projects/search", methods=["GET", "POST"])
class ApidtoProjectsSearch(Resource):
    @api.doc(
        "Get_search_infos",
        params={
            "query": "query string",
            "count": "item count",
            "page": "page number",
        },
    )
    def get(self):
        """This request will return all github projects that matches search query field"""
        query = request.args.get("query")

        count = request.args.get("count")
        if count is not None:
            count = int(count)
        else:
            count = 20

        page = request.args.get("page")
        if page is not None:
            page = int(page)
        else:
            page = 1

        result = get_search_projects(query, count, page)
        return result, result["code"]

    model = api.model(
        "Name Model",
        {
            "query": fields.String(
                description="search string",
                help="Enter a search query string",
                default="",
            ),
            "page": fields.Integer(
                description="Page number",
                default=1
            ),
            "count": fields.Integer(
                description="count of elements per page",
                default=20
            ),
            "languages": fields.List(
                cls_or_instance=fields.String,
                description="list of languages",
                help="Specify a list of languages",
                default=["javascript", "java", "c", "c++"]
            ),
            "sort_type": fields.String(
                description="Sorting type [alphabetic, popularity, most_recent]",
                help="Specify sorting type",
                default="most_recent"
            ),
        },
    )

    @api.expect(model)
    @api.doc(
        "Post_search_infos",
    )
    def post(self):
        """This request will return all github projects that matches search query field"""
        data = request.json

        # get query
        query = data.get("query")

        # get count
        count = data.get("count")
        if count is not None:
            count = int(count)
        else:
            count = 20

        # get page
        page = data.get("page")
        if page is not None:
            page = int(page)
        else:
            page = 1

        # get sort_type
        sort_type = data.get("sort_type")
        if sort_type is None:
            sort_type = ""

        # get languages
        languages = data.get("languages")
        if languages is None:
            languages = []

        result = post_search_projects(
            query, sort_type=sort_type, languages=languages, page=page, count=count
        )
        return result, result["code"]
