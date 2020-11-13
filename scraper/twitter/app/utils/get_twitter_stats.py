from os import system
import json
from app.settings import *
from app.utils.extractors import *


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

    # we remove the json output
    system("rm -rf ./out.json")


def get_top_mention(start_time: str, end_time: str):
    """
    A simple request for fetching the top_mentions

    @params: start_time, end_time the time range for filtering
            Ex : start_time="1602720000000", end_time="1605139199999"
    @returns : result, a json object

    """

    url = "{}/top_tweets.json?start_time={}&end_time={}" \
        .format(HOST, start_time, end_time)
    result = curl_request(url)

    result["top_mention"] = extract_top_mention(result)

    # we add range of time in the resut
    result["start_time"] = start_time
    result["end_time"] = end_time

    # we remove unecessary sub-objects
    del result["top_tweet"]
    del result["top_media_tweet"]

    return result


def get_top_follower(start_time: str, end_time: str):
    """
    A simple request for fetching the top_followers

    @params: start_time, end_time the time range for filtering
            Ex : start_time="1602720000000", end_time="1605139199999"
    @returns : result, a json object

    """

    url = "{}/top_follower.json?start_time={}&end_time={}" \
        .format(HOST, start_time, end_time)
    result = curl_request(url)

    # we add range of time in the resut
    result["start_time"] = start_time
    result["end_time"] = end_time
    result = extract_top_follower(result)

    return result


def get_page_summary(start_time: str, end_time: str):
    """
    A simple request for fetching the page_summary

    @params: start_time, end_time the time range for filtering
            Ex : start_time="1602720000000", end_time="1605139199999"
    @returns : result, a json object

    """

    url = "{}/page_summary.json?start_time={}&end_time={}" \
        .format(HOST, start_time, end_time)
    result = curl_request(url)

    # we add range of time in the resut
    result["start_time"] = start_time
    result["end_time"] = end_time
    result = extract_summary(result)

    return result
