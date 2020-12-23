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
    database=CONFIGS["MYSQL"]["DATABASE"]
)

# Databse requires a table called tweets with (tweet_id, text) columns
mydbcursor = mydb.cursor()


def sqlDatabaseInsert( tweet_id, tweet_text ):
	query = "INSERT INTO tweets (tweet_id, text) VALUES (%s, %s)"
	query_vals = (tweet_id, tweet_text)
	mydbcursor.execute(query, query_vals)
	mydb.commit()


# Configure the api.twitter.com paramaters
api_url = "https://api.twitter.com/2/tweets/search/recent?query=%23caparledev"
parameters = {
            "max_results" : 100
        }
for param in parameters:
    api_url += f"&{param}={parameters[param]}"

try: 
    try:
        print(">> Requesting:", api_url, headers)
        response = requests.get(api_url, headers=headers)
        results = response.json()

        if response.status_code != 200:
            raise ValueError(">> Request not successful...") 
        # print( results )
        else:
            data = results["data"]
            for i in tqdm(range(len(data)), desc="Extracting Tweets..."):
                try:
                    tweet_id = data[i]["id"]
                    tweet_text = data[i]["text"]
                    sqlDatabaseInsert( tweet_id, tweet_text )
                except Exception as e:
                    print(repr(e))
                    pass
                pass
    except ValueError as value_error:
        print(">> Error requesting from API:", value_error)
        print(">> Headers:", response.status_code)
        print(">> request_log:", results)
        print(">> Exiting...")

except Exception as e:
    print(">> runtime error:", repr(e))
