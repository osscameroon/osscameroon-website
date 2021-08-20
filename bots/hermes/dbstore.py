from google.cloud import datastore
import datetime

# For the gcloud auth to work properly this env variable should be set
# GOOGLE_APPLICATION_CREDENTIALS=./service-account.json

KIND_PROJECTS = "github_projects"
KIND_HERMES_CHATS = "hermes_chats"
KIND_HERMES_NOTIFIED = "hermes_notified"

__CLIENT = None


def __get_client():
    global __CLIENT
    if __CLIENT is None:
        __CLIENT = datastore.Client()
    return __CLIENT


client = datastore.Client()


def get_project():
    """ Get a list of all projects """
    projects = list(client.query(kind=KIND_PROJECTS).fetch())
    notified = list(client.query(kind=KIND_HERMES_NOTIFIED).fetch())
    
    if len(notified) == len(projects):
        return

    for project in projects:
        not_notified = None

        for notify in notified:
            if notify['project_id'] == project['id']:
                not_notified = project
                break

        # notify one project at a time
        if not_notified == None:
            return project


def save_notify(project_id):
    ''' Saves a project_id with it's notification timestamp '''

    key = client.key(KIND_HERMES_NOTIFIED)
    task = datastore.Entity(key=key)

    task.update({'project_id': project_id,
                'timestamp': datetime.datetime.now()})

    client.put(task)


def save_chat(chat):
    ''' All chats are groups or channels, chat dictionary id, type'''

    # Check if chat exists, by querying kind chats, and id = chat['id]
    # if exist return else do
    # return
    user = client.query(kind=KIND_HERMES_CHATS).add_filter(
        'id', '=', chat['id']).fetch(limit=1)

    if len(list(user)) == 1:
        return

    key = client.key(KIND_HERMES_CHATS)
    task = datastore.Entity(key=key)

    task.update(chat)
    client.put(task)


def get_chats():
    ''' Returns a List of chats '''
    query = client.query(kind=KIND_HERMES_CHATS)

    return list(query.fetch())
    
