#!/bin/python3
# Utilizes Twitter API 2.0

from tqdm import tqdm
import requests
import mysql.connector
import json
import configparser

CONFIGS = configparser.ConfigParser()
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


results = requests.get("https://api.twitter.com/2/tweets/search/recent?query=%23caparledev&max_results=10", headers=headers)
results = results.json()
# print( results )
data = results["data"]

# Without needing further entities of the tweet, this section can be utilized
for i in tqdm(range(len(data)), desc="Extracting Tweets..."):
	try:
		tweet_id = data[i]["id"]
		tweet_text = data[i]["text"]
		# sqlDatabaseInsert( tweet_id, tweet_text )
	except Exception as e:
		print(repr(e))
		pass
	pass

