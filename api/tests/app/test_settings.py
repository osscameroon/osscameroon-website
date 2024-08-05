import os
from unittest.mock import patch

from app.settings import get_conf


def test_get_conf_existing_key():
    key, value = 'existing_key', 'existing_value'

    with patch.dict(os.environ, {key: value}):
        assert get_conf(key) == value

def test_get_conf_missing_key():
    key, fallback = 'missing_key', 'default_value'

    with patch.dict(os.environ, {}):
        assert get_conf(key, fallback) == fallback

def test_get_conf_missing_key_no_fallback():
    key = 'missing_key'

    with patch.dict(os.environ, {}):
        assert get_conf(key) == ""
