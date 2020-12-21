from flask_restplus import Resource
from flask import request, json
import datetime

# from app.main.utils.decorator import *
from app.main.utils.dto import ApiDto
from app.main.utils.database.users import get_users, get_user
from app.main.utils.database.search import get_search_users

api = ApiDto.api


# Ex : /users?page=3&count
@api.route('/users', methods=['GET'])
class ApidtoUsers(Resource):
    @api.doc('Get_all_users')
    def get(self):
        """This method will return all github users with filter"""

        result = get_users(
            pagination_limit=request.args.get("page"),
            count=request.args.get("count")
        )

        return result, result["code"]


# Ex : /users/elhmne
@api.route('/users/<user_name>', methods=['GET'])
class ApidtoUser(Resource):
    @api.doc('Get_user_infos')
    def get(self, user_name):
        """This method will return a github user with more informations"""

        result = get_user(user_name)
        return result, result["code"]


# Ex : /search/users?q=<query_string>&count=<element_per_page>&page=<page_number>
@api.route('/users/search', methods=['GET'])
class ApidtoSearch(Resource):
    @api.doc('Get_search_infos')
    def get(self):
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
