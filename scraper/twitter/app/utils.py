import time
from os import system
from random import randint, shuffle, randrange, sample
import json 
import uuid
import threading
from bs4 import BeautifulSoup
from app.settings import *



def curl_request(url: str):
    """

    This method is responsible for making the curl request

    @params: url the url of the request
    @returns: result, the json response from that request

    """

    system("\
        curl '" + url + "' \
        -H 'authority: analytics.twitter.com' \
        -H 'pragma: no-cache' \
        -H 'cache-control: no-cache' \
        -H 'accept: application/json, text/javascript, */*; q=0.01' \
        -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36' \
        -H 'x-requested-with: XMLHttpRequest' \
        -H 'sec-fetch-site: same-origin' \
        -H 'sec-fetch-mode: cors' \
        -H 'sec-fetch-dest: empty' \
        -H 'referer: https://analytics.twitter.com/user/" + ACCOUNT["username"] + "/tweets' \
        -H 'accept-language: en-US,en;q=0.9' \
        -H 'cookie: " + ACCOUNT["cookie"] + "' \
        --compressed > out.json")

    # we just read the file and return the output
    with open("./out.json", "r") as fr:
        return json.loads(fr.read())

def get_top_tweets(start_time: str, end_time: str):
    """
    A simple request for fetching the top_tweets

    @params: start_time, end_time the time range for filtering
            Ex : start_time="1602720000000", end_time="1605139199999"
    @returns : result, a json object

    """

    url = "{}/top_tweets.json?start_time={}&end_time={}"\
        .format(HOST, start_time, end_time)
    result = curl_request(url)

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

    result["top_follower"]["user"]["avatar"] = user_info.find("img", {
        "class": "profile-card-avatar-image"
    })["src"]

    result["top_follower"]["user"]["bio"] = user_info.find("p", {
        "class": "profile-card-bio"
    }).get_text()

    return result

def get_top_follower(start_time: str, end_time: str):
    """
    A simple request for fetching the top_followers

    @params: start_time, end_time the time range for filtering
            Ex : start_time="1602720000000", end_time="1605139199999"
    @returns : result, a json object

    """

    url = "{}/top_follower.json?start_time={}&end_time={}"\
        .format(HOST, start_time, end_time)
    result = curl_request(url)

    return extract_user_info(result)

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

def get_page_summary(start_time: str, end_time: str):
    """
    A simple request for fetching the page_summary

    @params: start_time, end_time the time range for filtering
            Ex : start_time="1602720000000", end_time="1605139199999"
    @returns : result, a json object

    """

    url = "{}/page_summary.json?start_time={}&end_time={}"\
        .format(HOST, start_time, end_time)
    result = curl_request(url)

    return extract_summary(result)

def proceed():
    """

    Per round, what it is done

    """
    
    start_time = "1604188800000"
    end_time = "1605225599999"
    print("\n------------------------------------------")

    print("> - - - - - - - - - - - -")
    print("> Scraping Top-Tweets : ")
    r = get_top_tweets(start_time, end_time)
    print(r)
    with open("tmp.html", "w") as ft:
        ft.write(r["top_mention"]["html"])

    # print("> - - - - - - - - - - - -")
    # print("> Scraping Top-Follower : ")
    # print("- - - - - - - -\n", get_top_follower(start_time, end_time))

    # print("> - - - - - - - - - - - -")
    # print("> Scraping Page-Summary : ")
    # print("- - - - - - - -\n", get_page_summary(start_time, end_time))

    print("\n------------------------------------------")
