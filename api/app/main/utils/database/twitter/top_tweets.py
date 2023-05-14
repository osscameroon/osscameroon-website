from typing import Any

import requests
from requests_oauthlib import OAuth1

from app.main.utils.helpers.cache import Cache
from app.main.utils.helpers.commons import get_trace
from app.settings import API_KEY, API_SECRET_KEY


def top_tweets(cache: Cache, count: int) -> dict[str, Any] | None:
    """
    This method will return top-tweets
    comming from the request or just the cache

    params : the cache for the context
    return boolean telling if everything went well [top-tweets] as string
    """

    # nothing inside top_tweets key
    if not cache.get("top-tweets"):
        try:
            # we make another request
            # to the twitter api
            print(">> Hitting twitter api...")

            search_twitter_host = "https://api.twitter.com/1.1/search/tweets.json"
            tweets = requests.get(
                "{}?q=%23caparledev%20-filter%3Aretweets&count={}".format(
                    search_twitter_host,
                    str(count)
                ),
                auth=OAuth1(API_KEY, API_SECRET_KEY)
            ).content.decode()

            # and we cache it as json string for 1h
            cache.set("top-tweets", tweets, 3600)
        except Exception:
            # We just print the trace-back here
            get_trace()

    return cache.get("top-tweets")


def get_top_tweets(cache: Cache, count: int) -> dict[str, Any]:
    """
    This method will check the return of top-tweet and send
    the appropriate status code for the request

    """

    results = top_tweets(cache, count)
    error = True if results is None or "errors" in results else False

    return {
        "code": 500 if error else 200,
        "status": "error" if error else "success",
        "result": results if not error else {}
    }
