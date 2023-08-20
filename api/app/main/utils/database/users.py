# database utils functions

from app.main.utils import converters

def sanitize_user_data(data):
    """
    sanitize_user_data [prepare user data format]
    @params: data
    """

    return converters.convert_datetime_fields_to_string(data)


def sanitize_array_of_user_data(data_arr: list):
    """
    sanitize_array_of_user_data [prepare array of user data format]
    @params: data_arr
    """
    for data in data_arr:
        data = sanitize_user_data(data)
    return data_arr
