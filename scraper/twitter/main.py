#!/bin/python3
# Utilizes Twitter API 2.0

from google.cloud import datastore
from requests.exceptions import HTTPError

from tqdm import tqdm
import requests
import configparser
import json

CONFIGS = configparser.ConfigParser(interpolation=None)
CONFIGS.read('config.ini')

TWITTER_API_LINK = 'https://api.twitter.com/1.1/search/tweets.json'

# For the gcloud auth to work properly this env variable should be set
# GOOGLE_APPLICATION_CREDENTIALS=.secrets/service-account.json

__CLIENT = None


def __get_client():
    """
    This method is to prevent the recreation of the google
    datastore client
    """
    global __CLIENT

    if __CLIENT is None:
        __CLIENT = datastore.Client()
    return __CLIENT


def store_tweet(tweet_data: dict):
    """Because of not this, defining the type is useless"""
    if not isinstance(tweet_data, dict):
        raise TypeError
    """
        Stores user data in our gcp datastore server
        @params : user data
    """

    client = __get_client()
    key = client.key('twitter', tweet_data.get('id', None))

    data = datastore.Entity(key)
    data.update(tweet_data)
    client.put(data)


def change_data_structure(data: dict) -> dict:
    """ Restructure data to a format that can handled by the datastore """
    tweet_data = data

    # This needs to be done because for some reason I don't understand
    # protobuf used by the datastore return this error
    # google.api_core.exceptions.InvalidArgument: 400 list_value cannot
    # contain a Value containing another list_value.
    if 'place' in tweet_data:
        tweet_data['place'] = json.dumps(tweet_data['place'])

    return tweet_data


def fetch_tweets(api_url: str) -> dict:
    """Available from Twitter App """
    tweeterBearerToken = CONFIGS['AUTH']['BEARER_TOKEN']
    headers = {'Authorization': 'Bearer ' + tweeterBearerToken}

    print(f'>> Requesting: {api_url}, {headers}')
    response = requests.get(api_url, headers=headers)
    if response.status_code != 200:
        raise HTTPError(response.text)

    results = response.json()
    return results


def run_job():
    # Default query url for api
    # Twitter 2.0
    # api_url = "https://api.twitter.com/2/tweets/search/recent?query=%23caparledev"

    # Twitter 1.1
    api_url = f'{TWITTER_API_LINK}/?q=%23caparledev%20-filter%3Aretweets'

    try:
        results = fetch_tweets(api_url)
        print(results['search_metadata'])
        while 'next_results' in results['search_metadata']:
            results = fetch_tweets(
                f"{TWITTER_API_LINK}/results['search_metadata']['next_results']"
            )
            res_len = len(results['statuses'])
            for i in tqdm(range(res_len), desc='Storing in GCP...'):
                data = change_data_structure(results['statuses'][i])
                store_tweet(data)
    except (ValueError, HTTPError, TypeError) as excp:
        raise ValueError from excp


if __name__ == '__main__':
    run_job()
