import config
import dbstore
from telegram import Bot

''' Script to be run from a cron job, to fetch recent projects and send to registed 'chats' '''

bot = Bot(token=config.get_config()['Telegram']['token'])


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

        dbstore.save_notify(project['id'])
