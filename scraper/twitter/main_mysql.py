#!/bin/python3
# Utilizes Twitter API 2.0

from tqdm import tqdm
import requests
import mysql.connector
import configparser

CONFIGS = configparser.ConfigParser(interpolation=None)
CONFIGS.read( "config.ini" )

# Available from Twitter App
tweeterBearerToken = CONFIGS["AUTH"]["BEARER_TOKEN"]
headers = {'Authorization': 'Bearer ' + tweeterBearerToken}

# uncomment if local storage to be tested
mydb = mysql.connector.connect(
    host=CONFIGS["MYSQL"]["HOST"],
    user=CONFIGS["MYSQL"]["USER"],
    password=CONFIGS["MYSQL"]["PASSWORD"],
    database=CONFIGS["MYSQL"]["DATABASE"],
    use_unicode=True,
    charset='utf8'
)

# Databse requires a table called tweets with (tweet_id, text) columns
mydbcursor = mydb.cursor()

def sqlDatabaseInsert( tweet_id, tweet_text ):
    try:
        query = "INSERT INTO tweets (tweet_id, text) VALUES (%s, %s)"
        query_vals = (tweet_id, tweet_text)
        mydbcursor.execute(query, query_vals)
        mydb.commit()
    except mysql.connector.Error as err:
        print(err)
        print("Error Code:", err.errno)
        print("SQLSTATE", err.sqlstate)
        print("Message", err.msg)

def fetch_tweets( api_url, parameters ):
    for param in parameters:
        api_url += f"&{param}={parameters[param]}"
    print(">> Requesting:", api_url, headers)

    response = requests.get(api_url, headers=headers)
    results = response.json()
    if response.status_code != 200:
        raise ValueError( response ) 
    else:
        return results


try: 
    # Default query url for api
    api_url = "https://api.twitter.com/2/tweets/search/recent?query=%23caparledev"
    # Configure the api.twitter.com paramaters
    parameters = { "max_results" : 10 }
    try:
        results = fetch_tweets( api_url, parameters )
        datastore = results["data"]
        while "next_token" in results["meta"]:
            parameters["next_token"] = results["meta"]["next_token"]
            results = fetch_tweets( api_url, parameters )

            for i in tqdm(range(len(results["data"])), desc="Storing in MySQL..."):
                if "text" in results["data"][i]:
                    sqlDatabaseInsert( results["data"][i]["id"], results["data"][i]["text"] )

    except ValueError as value_error:
        print(">> Error requesting from API:", value_error)

except ValueError as runtime_error:
    print(">> runtime error:", repr(runtime_error))
