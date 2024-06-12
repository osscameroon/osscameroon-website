import pytest
from twitter.main import change_data_structure, store_tweet


def test_store_tweet(mocker):
    # should raise a type error
    with pytest.raises(TypeError):
        store_tweet('bad stuff, should raise the error')  # type: ignore

    google_client_mock = mocker.patch('twitter.main.__get_client')
    google_client_mock.key.return_value = {'something': 'is off'}
    datastore_entity_mock = mocker.patch('google.cloud.datastore.Entity')
    store_tweet({'test': 'value'})

    assert google_client_mock.call_count == 1
    assert datastore_entity_mock.call_count == 1


def test_change_data_structure():
    assert change_data_structure({'test': 'something'}) == {'test': 'something'}
    assert change_data_structure({'place': {'test': 'something'}}) == {'place': '{"test": "something"}'}


def test_fetch_tweets():
    # TODO
    pass

def test_run_job():
    # TODO
    pass
