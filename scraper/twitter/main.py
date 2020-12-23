#!/bin/python3
# Utilizes Twitter API 2.0

from tqdm import tqdm
import requests
import configparser

CONFIGS = configparser.ConfigParser(interpolation=None)
CONFIGS.read( "config.ini" )

# Available from Twitter App
tweeterBearerToken = CONFIGS["AUTH"]["BEARER_TOKEN"]
headers = {'Authorization': 'Bearer ' + tweeterBearerToken}

def fetch_tweets( api_url, parameters ):
    for param in parameters:
        api_url += f"&{param}={parameters[param]}"
    print(">> Requesting:", api_url, headers)

    response = requests.get(api_url, headers=headers)
    results = response.json()
    if response.status_code != 200:
        raise ValueError(">> Request not successful...") 
    else:
        return results


try: 
    # Default query url for api
    api_url = "https://api.twitter.com/2/tweets/search/recent?query=%23caparledev"
    # Configure the api.twitter.com paramaters
    parameters = { "max_results" : 100 }

    datastore = []
    try:
        results = fetch_tweets( api_url, parameters )
        datastore = results["data"]
        while "next_token" in results["meta"]:
            parameters["next_token"] = results["meta"]["next_token"]
            results = fetch_tweets( api_url, parameters )
            datastore = datastore + results["data"]

    except ValueError as value_error:
        print(">> Error requesting from API:", value_error)
        print(">> Headers:", response.status_code)
        print(">> request_log:", results)
        print(">> Exiting...")

    for i in tqdm(range(len(datastore)), desc="Extracting Tweets..."):
        tweet_id = datastore[i]["id"]
        tweet_text = datastore[i]["text"]

        # TODO: Something with GCP or for GCP or turn this whole thing to a function and import
        print( datastore[i] )

        pass

except Exception as e:
    print(">> runtime error:", repr(e))
