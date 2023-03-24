import configparser

from app.settings import get_key_env


def test_get_env(mocker):
    """ """
    mocker.patch.object(configparser.RawConfigParser, "read")
    mocker.patch.object(configparser.RawConfigParser, "get").return_value = "xxx"

    assert get_key_env("YYY", "ZZZ") == "xxx"
