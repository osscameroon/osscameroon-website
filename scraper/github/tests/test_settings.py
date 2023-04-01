import configparser
import pytest
from pytest_mock import MockerFixture

from app.settings import get_key_env


def test_get_env(mocker: MockerFixture) -> None:
    mocker.patch.object(configparser.RawConfigParser, "read")
    mocker.patch.object(configparser.RawConfigParser, "get").return_value = "xxx"

    assert get_key_env("scope", "something") == "xxx"

    mocker.patch.object(
        configparser.RawConfigParser, "get"
    ).side_effect = configparser.NoOptionError("Error while reading", "xxx")

    with pytest.raises(Exception):
        assert get_key_env("xxx", "something") == "xxx"
