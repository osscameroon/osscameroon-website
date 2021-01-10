from flask import request
from flask_restplus import Resource
from app.main.utils.dto import ApiDto
from app.main.utils.database.twitter.top_tweets import get_top_tweets
from app.main.utils.helpers.cache import Cache


api = ApiDto.twitter_api
cache = Cache()

# Ex : /top-tweets?count=<count>
# Default count is 6
@api.route("/top-tweets", methods=["GET"])
class ApidtoTopTweets(Resource):
    @api.doc(
        "Get_top_tweets",
        params={
            "count": "item count"
        }
    )
    def get(self):
        """This method will return all top tweets"""

        count = request.args.get("count")
        if count is not None:
            count = int(count)
        else:
            count = 6

        result = get_top_tweets(cache, count)

        return result, result["code"]

