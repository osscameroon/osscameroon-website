from bs4 import BeautifulSoup


def extract_summary(result: object):
    """

    Using BeautifulSoup to extract summary necessary 
    information from the html content
    
    @params: result as input result from curl-request
    @return: result as the parsed object

    """
    # we parse the html content
    parser = BeautifulSoup(result["page_summary"]["html"], "html.parser") \
    .find("div", {
        "class": "home-pagesummary"
    })

    # We remove the html key
    del result["page_summary"]["html"]
    
    # we create others parameters from beautifullsoup parser
    result["page_summary"]["visits"] = parser.find("div", {
        "class": "metric-profile-views"
    }).get_text()

    result["page_summary"]["mentions"] = parser.find("div", {
        "class": "metric-mentions"
    }).get_text()

    result["page_summary"]["followers"] = parser.find("div", {
        "class": "metric-followers"
    }).get_text()

    return result


def extract_user_info(result: object):
    """

    Using BeautifulSoup to extract user 
    information from the html content
    
    @params: result as input result from curl-request
    @return: result as the parsed object

    """
    # we parse the html content
    parser = BeautifulSoup(result["top_follower"]["html"], "html.parser") \
    .find("div", {
        "class": "organic"
    })

    # We remove the html key
    del result["top_follower"]["html"]

    # we create others parameters from beautifullsoup parser
    result["top_follower"]["followed_by"] = parser.find("h2", {
        "class": "home-panel-title"
    }).find("small")\
        .get_text()\
        .replace("followed by ", "")\
        .replace(" people", "")\
        .replace("\n", "").strip()

    # we set the user_info parser
    user_info = parser.find("div", {
        "class": "profile-card-user-fields"
    })

    # we create the user object
    result["top_follower"]["user"] = {}
    result["top_follower"]["user"]["href"] = user_info.find("a", {
        "class": "profile-card-name-link"
    })["href"]

    result["top_follower"]["user"]["username"] = user_info.find("a", {
        "class": "profile-card-name-link"
    }).get_text()

    result["top_follower"]["user"]["avatar"] = parser.find("img", {
        "class": "profile-card-avatar-image"
    })["src"]

    result["top_follower"]["user"]["bio"] = user_info.find("p", {
        "class": "profile-card-bio"
    }).get_text()

    return result


def extract_top_mention(result: object):
    """

    """
    # we parse the html content
    parser = BeautifulSoup(result["top_mention"]["html"], "html.parser") \
    .find("div", {
        "class": "organic"
    })

    # We remove the html key
    del result["top_mention"]["html"]
    
    # we create others parameters from beautifullsoup parser
    result["top_mention"]["engagements"] = parser.find("h2", {
        "class": "home-panel-title"
    }).find("small")\
        .get_text()\
        .replace("earned ", "")\
        .replace(" engagements", "")\
        .replace("\n", "").strip()

    # We extract user informations
    result["top_mention"]["user"] = {}
    result["top_mention"]["user"]["avatar"] = parser.find("img", {
        "class": "tweet-avatar"
    })["src"]

    result["top_mention"]["user"]["href"] = parser.find("a", {
        "class": "tweet-profile-link"
    })["href"]

    result["top_mention"]["user"]["name"] = parser.find("span", {
        "class": "tweet-name"
    }).get_text()

    result["top_mention"]["user"]["sreen-name"] = parser.find("span", {
        "class": "tweet-screen-name"
    }).get_text()


    result["top_mention"]["href"] = parser.find("span", {
        "class": "tweet-created-at"
    }).find("a")["href"]

    result["top_mention"]["tweet"] = parser.find("span", {
        "class": "tweet-text"
    }).get_text()

    # we get metrics
    metrics = parser.find("div", {
        "class": "tweet-metrics-container"
    })

    result["top_mention"]["metrics"] = {}
    result["top_mention"]["metrics"]["comments"] = metrics.find_all("span", {
        "class": "tweet-metric"
    })[0].get_text().strip()
    result["top_mention"]["metrics"]["likes"] = metrics.find_all("span", {
        "class": "tweet-metric"
    })[1].get_text().strip()

    return result["top_mention"]