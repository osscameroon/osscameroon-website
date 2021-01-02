import requests
from app.settings import API_SECRET, API_SECRET_KEY
import json
from app.main.utils.helpers.cache import Cache

# c = Cache()

def top_tweets(cache):
    """
    This method will return top-tweets
    comming from the request or just the cache

    params : the cache for the context
    return boolean telling if everything went well [top-tweets] as string
    """

    if cache.get("top-tweets") is None:
        try:
            # we make another request
            # to the twitter api
            tweets = requests.get(
              "https://api.twitter.com/1.1/search/tweets.json?q=#CaParleDev&result_type=popular",
              auth=HTTPBasicAuth(API_SECRET, API_SECRET_KEY)
            )
            # and we cache it as json string
            cache.set("top-tweets", json.dumps(tweets))
        except Exception as es:
            raise es
            return False, ""

    return True, cache.get("top-tweets")


def get_top_tweets(cache):
    """
    This method will check the return of top-tweet and send
    the appropriate status code for the request

    """

    results = top_tweets(cache)

    if results[0]:
        return {
            "code": 200,
            "status": "success",
            "result": results[1]
        }
    else:
        return {
                "code": 500,
                "status": "error"
        }

