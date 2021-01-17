#!/bin/python3
# Utilizes Twitter API 2.0

from google.cloud import datastore

from tqdm import tqdm
import requests
import configparser
import json

CONFIGS = configparser.ConfigParser(interpolation=None)
CONFIGS.read("config.ini")

# Available from Twitter App
tweeterBearerToken = CONFIGS["AUTH"]["BEARER_TOKEN"]
headers = {'Authorization': 'Bearer ' + tweeterBearerToken}

# For the gcloud auth to work properly this env variable should be set
# GOOGLE_APPLICATION_CREDENTIALS=.secrets/service-account.json

KIND_PROJECT = "twitter"
__CLIENT = None


def __get_client():
    global __CLIENT
    # print( dir(datastore.Client))
    if __CLIENT is None:
        __CLIENT = datastore.Client()
    return __CLIENT


def store_tweet(tweet_data: dict):
    # Because of not this, defining the type is useless
    if not isinstance(tweet_data, dict):
        raise TypeError
    """
        Stores user data in our gcp datastore server

        @params : user data
    """

    client = __get_client()
    key = client.key(KIND_PROJECT, tweet_data["id"])

    data = datastore.Entity(key)
    data.update(tweet_data)
    client.put(data)


def change_data_structure(data: dict):
    """
        Restructure data to a format that can handled by the datastore
    """
    tweet_data = data

    # This needs to be done because for some reason I don't understand
    # protobuf used by the datastore return this error
    # google.api_core.exceptions.InvalidArgument: 400 list_value cannot contain a Value containing another list_value.
    if "place" in tweet_data:
        tweet_data["place"] = json.dumps(tweet_data["place"])

    return tweet_data


def fetch_tweets(api_url):
    print(">> Requesting:", api_url, headers)
    response = requests.get(api_url, headers=headers)
    results = response.json()
    if response.status_code != 200:
        # raise ValueError(">> Request not successful...")
        raise ValueError(response)
    else:
        return results


try:
    # Default query url for api

    # Twitter 2.0
    # api_url = "https://api.twitter.com/2/tweets/search/recent?query=%23caparledev"

    # Twitter 1.1
    api_url = "https://api.twitter.com/1.1/search/tweets.json?q=%23caparledev%20-filter%3Aretweets"

    try:
        results = fetch_tweets(api_url)
        print(results['search_metadata'])
        while "next_results" in results["search_metadata"]:
            # print( results["search_metadata"])
            api_url_mini = "https://api.twitter.com/1.1/search/tweets.json"
            api_url_mini += results["search_metadata"]["next_results"]
            # print( api_url_mini )

            results = fetch_tweets(api_url_mini)

            # print(results["statuses"])
            res_len = len(results["statuses"])
            for i in tqdm(range(res_len), desc="Storing in GCP..."):
                data = change_data_structure(results["statuses"][i])
                store_tweet(data)

    except ValueError as value_error:
        print(">> Error requesting from API:", value_error)

except ValueError as runtime_error:
    print(">> runtime error:", repr(runtime_error))
