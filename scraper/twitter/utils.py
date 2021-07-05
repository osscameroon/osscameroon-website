

def rate_tweet(tweet):
    """
    This method will return a coeficient for a tweet
    following some rules

    # rules
    # - It should not be a reply
    # - Each parameter will have a specific coefficient
    # - We are going to have two arrays for 'fr' and 'en' maximum per array is 3 and minimum is 0
    # Should not be sensitive or (empty value) parameter possibly_sensitive
    # The same user can not have more than 2 tweets on each array of tweets
    """

    FAVORITE_COEFFICIENT = 0.3
    RETWEET_COEFFICIENT = 0.2
    IS_NOT_REPLY_COEF = 0.15
    IS_QUOTED_COEF = 0.09
    # We allocate coefs for each lang
    LANG_COEF = {"en": 0.04, "fr": 0.021, "und": 0.015}
    TEXT_SIZE_COEF = 0.07

    coef = 0

    if tweet["possibly_sensitive"] is not True:
        coef = tweet["favorite_count"] * FAVORITE_COEFFICIENT
        coef += tweet["retweet_count"] * RETWEET_COEFFICIENT

        # lang coef
        if "fr" in tweet["lang"] or "en" in tweet["lang"] or "und" in tweet["lang"]:
            coef += LANG_COEF[tweet["lang"]]

        # We add to the coeficient  the coef for the text size
        coef += len(str(tweet["text"]).replace("#CaParleDev")) * TEXT_SIZE_COEF

        # check if it's a quoted_tweet
        if tweet["is_quote-status"] is not True:
            coef += IS_QUOTED_COEF

        # it should not be a reply
        if tweet["in_reply_to_user_id"] is not None:
            coef += IS_NOT_REPLY_COEF

    return coef
