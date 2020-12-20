# coding: utf-8
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from app.utils.database.users import get_users, get_user
from app.utils.database.search import get_search_users


app = Flask(__name__)
# For cors
CORS(app, support_credentials=True)


# Ex : /
@app.route('/', methods=['GET'])
# For cors issues
@cross_origin(supports_credentials=True)
def index():
    # Build the response and return it
    return jsonify({
        'status': 'success',
        'message': 'Welcome to CaParleDev-Scrapper API.',
        'documentation': 'https://documenter.getpostman.com/view/11958813/TVYQ1u1Q'
    })


# Ex : /users?page=3&count
@app.route('/users', methods=['GET'])
# For cors issues
@cross_origin(supports_credentials=True)
def users():

    count = request.args.get("count")
    if count is not None:
        count = int(count)

    result = get_users(
        pagination_limit=request.args.get("page"),
        count=count
    )

    return jsonify(result), result["code"]


# Ex : /users/sanix-darker
@app.route('/users/<user_name>', methods=['GET'])
# For cors issues
@cross_origin(supports_credentials=True)
def user(user_name):
    result = get_user(user_name)
    return jsonify(result), result["code"]


# Ex : /search/users?q=<query_strin>g&count=<element_per_page>&page=<page_number>
@app.route('/search/users', methods=['GET'])
# For cors issues
@cross_origin(supports_credentials=True)
def search():
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
    return jsonify(result), result["code"]


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=8811)
