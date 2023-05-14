from app.main.utils.database.twitter.top_tweets import get_top_tweets
from app.main.utils.helpers.cache import Cache
from manage import app

cache = Cache()

# Ex : /top-tweets?count=<count>
# Default count is 6
@app.get("/top-tweets")
def top_tweets(count: int=6) -> dict:
    """This method will return all top tweets"""
    return get_top_tweets(cache, count)
