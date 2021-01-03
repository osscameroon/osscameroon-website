import requests
from app.settings import API_SECRET, API_SECRET_KEY
import json
from app.cache import Cache

c = Cache()

def top_tweets():
    """
    This method will return top-tweets
    comming from the request or just the cache

    return [top-tweets] as string
    """

    if c.get("top-tweets") is None:
        # we make another request
        # to the twitter api
        tweets = requests.get(
          "https://api.twitter.com/1.1/search/tweets.json?q=#CaParleDev&result_type=popular",
          auth=HTTPBasicAuth(API_SECRET, API_SECRET_KEY)
        )
        # and we cache it as json string
        c.set("top-tweets", json.dumps(tweets))

    return c.get("top-tweets")

