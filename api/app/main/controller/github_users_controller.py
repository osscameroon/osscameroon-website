from flask_restplus import Resource
from flask import request

# from app.main.utils.decorator import *
from app.main.utils.dto import ApiDto
from app.main.utils.database.users import get_users, get_user

api = ApiDto.api


# Ex : /users?page=3&count
@api.route('/', methods=['GET'])
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
@api.route('/<user_name>', methods=['GET'])
class ApidtoUser(Resource):
    @api.doc('Get_user_infos')
    def get(self, user_name):
        """This method will return a github user with more informations"""

        result = get_user(user_name)
        return result, result["code"]
