import config
import dbstore
import os
from telegram import Bot
import tweepy

consumer_key = os.getenv("CONSUMER_KEY")
consumer_secret = os.getenv("CONSUMER_SECRET")
api_key = os.getenv("API_KEY")
api_secret = os.getenv("API_SECRET")


def post_tweet(api, text):
    if text:
        print("Twitter publisher: \n", text)
        print("Lenght: ", len(text))
        api.update_status(text)


token = config.get_config()['Telegram']['token']
if token == "":
    token = os.getenv('TELEGRAM_TOKEN')


telegram_channel_id = os.getenv('TELEGRAM_CHANNEL_ID')

bot = Bot(token=token)


def get_project_text(project):
    ''' Returns project as a nicely formatted string '''

    return f"Please checkout this Cameroonian open source project\n\n<b>Name</b>: <u>{project['name']}</u>\n\nBy <b>{project['owner']['login']}</b>\n\n<b>Description</b>: {project['description']}\n\n<b>Link</b>: {project['html_url']}"


def get_twitter_text(project):
    '''' Returns a twitter text extracted from the project'''

    description = project['description']
    if not description:
        description = "a really cool project!"
    truncated_description = (description[:75] + '..') if len(description) > 75 else description
    return f"""
Please checkout this Cameroonian open source project by {project['owner']['login']},

description: {truncated_description}

find out more: {project['html_url']}

#CaParleDev
"""


def handle_twitter_messages(project):
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(api_key, api_secret)
    api = tweepy.API(auth)

    text = get_twitter_text(project)
    post_tweet(api, text)


def handle_telegram_messages(project):
    chats = dbstore.get_chats()
    for chat in chats:
        bot.send_message(
            chat_id=chat['id'], parse_mode='HTML', text=get_project_text(project))

    if telegram_channel_id != "":
        bot.send_message(
            chat_id=telegram_channel_id, parse_mode='HTML', text=get_project_text(project))


if __name__ == "__main__":
    ''' Script to be run from a cron job, to fetch recent projects and send to registed 'chats' '''
    project = dbstore.get_project()
    if project:
        handle_telegram_messages(project)
        handle_twitter_messages(project)
        dbstore.save_notify(project['id'])
