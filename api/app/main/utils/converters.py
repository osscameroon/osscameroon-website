import datetime

def convert_datetime_fields_to_string(data: dict):
    """
        this function converts top level field of type datetime
        to string
    """

    for key, val in data.items():
        if isinstance(val, (datetime.date, datetime.datetime)):
            data[key] = val.strftime("%Y-%m-%dT%H:%M:%SZ")
    return data
