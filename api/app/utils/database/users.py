# database utils functions
import json


def get_users(pagination_limit, count):
    """
    get_users [this method fetch dev users from the database]

    @params : pagination_limit, count
    @returns : - code : the status code of the request
               - status the status string of the request
               - result the result of that request
    """

    if count is None:
        count = 100
    
    if pagination_limit is None:
        pagination_limit = 2

    mongo_results = [
        {
            "dump1": "1",
            "dump2": "2",
        },
        {
            "dump3": "3",
            "dump4": "4",
        },
        {
            "dump5": "1",
            "dump6": "2",
        }
    ]

    response = {
        "code": 200,
        "status": "success",
        "result": mongo_results[:int(count)]
    }

    return response


def get_user(user_name: str):
    """
    get_user[this method fetch dev user's information 
    from the database]

    @params : user_name
    @returns : Object reponse for the github user infos

    """

    mongo_result = {
        "code": 200,
        "result": {
            "dump3":"3",
            "dump4":"4",
        }
    }

    return mongo_result
