'''
# This code is intended to listen to /start command and register chats, should be once in the database
'''
import logging
from telegram.ext import (Updater, CommandHandler)

import dbstore


updater = Updater(
    token='TOKEN', use_context=True)

dispatcher = updater.dispatcher

logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.INFO)


def start(update, context):
    chat = update.message.chat

    # get user id, type (group, channel)
    if chat['type'] == 'group' or chat['type'] == 'channel':
        dbstore.save_chat({'id': chat['id'], 'type': chat['type']})

    context.bot.send_message(
        chat_id=update.effective_chat.id, text="Welcome to OSS Cameroon Projects, do well to visit this verious amazing hardwork of our contributors and give them a helping hand!")


start_handler = CommandHandler('start', start)
dispatcher.add_handler(start_handler)


updater.start_polling()
