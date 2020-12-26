#!/bin/python3
# Utilizes Twitter API 2.0

from google.cloud import datastore

import requests
import configparser

CONFIGS = configparser.ConfigParser(interpolation=None)
CONFIGS.read("config.ini")

# Available from Twitter App
tweeterBearerToken = CONFIGS["AUTH"]["BEARER_TOKEN"]
headers = {'Authorization': 'Bearer ' + tweeterBearerToken}

# For the gcloud auth to work properly this env variable should be set
# GOOGLE_APPLICATION_CREDENTIALS=.secrets/service-account.json

# KIND_USERS = "twitter_tweets"
__CLIENT = None

def __get_client():
    global __CLIENT
    if __CLIENT is None:
        __CLIENT = datastore.Client()
    return __CLIENT

def store_user(tweet_data: dict):
    # Because of not this, defining the type is useless
    if not isinstance(tweet_data, dict):
    	raise TypeError
    """
        Stores user data in our gcp datastore server

        @params : user data
    """

    if not user:
        return

    client = __get_client()
    key = client.key("twitter", tweet_data["tweet_id"])
    # key = client.key(KIND_USERS, user["id"])
    data = datastore.Entity(key)
    data.update(user)
    client.put(data)


def fetch_tweets(api_url, parameters):
    for param in parameters:
        api_url += f"&{param}={parameters[param]}"
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
    api_url = "https://api.twitter.com/2/tweets/search/recent?query=%23caparledev"
    # Configure the api.twitter.com paramaters
    parameters = {"max_results": 100}

    datastore = []
    try:
        results = fetch_tweets(api_url, parameters)
        datastore = results["data"]
        while "next_token" in results["meta"]:
            parameters["next_token"] = results["meta"]["next_token"]
            results = fetch_tweets(api_url, parameters)
	    # store_user( results )
            # datastore = datastore + results["data"]
            # TODO: do the storing here directly

    except ValueError as value_error:
        print(">> Error requesting from API:", value_error)

except Exception as e:
    print(">> runtime error:", repr(e))
