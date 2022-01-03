import config
import dbstore
import os
from telegram import Bot

''' Script to be run from a cron job, to fetch recent projects and send to registed 'chats' '''

token = config.get_config()['Telegram']['token']
if token == "":
    token = os.getenv('TELEGRAM_TOKEN')


telegram_channel_id = os.getenv('TELEGRAM_CHANNEL_ID')

bot = Bot(token=token)


def get_project_text(project):
    ''' Returns project as a nicely formatted string '''

    return f"Please checkout this Cameroonian open source project\n\n<b>Name</b>: <u>{project['name']}</u>\n\nBy <b>{project['owner']['login']}</b>\n\n<b>Description</b>: {project['description']}\n\n<b>Link</b>: {project['html_url']}"


chats = dbstore.get_chats()

if len(chats) != 0:
    project = dbstore.get_project()

    if project:
        for chat in chats:
            bot.send_message(
                chat_id=chat['id'], parse_mode='HTML', text=get_project_text(project))

        if telegram_channel_id != "":
            bot.send_message(
                chat_id=telegram_channel_id, parse_mode='HTML', text=get_project_text(project))
        dbstore.save_notify(project['id'])
