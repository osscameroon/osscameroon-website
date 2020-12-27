#!/bin/python3
# Utilizes Twitter API 2.0

from google.cloud import datastore

from tqdm import tqdm
import requests
import configparser

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


def fetch_tweets(api_url, parameters): 
    for param in parameters: api_url += f"&{param}={parameters[param]}" 
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

    try:
        results = fetch_tweets(api_url, parameters)
        while "next_token" in results["meta"]:
            parameters["next_token"] = results["meta"]["next_token"]
            results = fetch_tweets(api_url, parameters)
            
            for i in tqdm(range(len(results["data"])), desc="Storing in GCP..."):
                store_tweet( results["data"][i] )

    except ValueError as value_error:
        print(">> Error requesting from API:", value_error)

except ValueError as runtime_error:
    print(">> runtime error:", repr(runtime_error))
