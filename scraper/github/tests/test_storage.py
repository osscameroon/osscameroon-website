import datetime
import json
import pytest
from unittest.mock import patch, Mock

from pymongo.collection import Collection
from pymongo.errors import ConnectionFailure

from mongo import (
    __get_client,
    get_collection,
    store_user,
    store_project,
    get_one_page_of_users,
    fetch_all_users,
    KIND_USERS,
    KIND_PROJECTS,
    MONGO_LINK,
    MONGO_DATABASE,
)


@pytest.fixture()
def mock_client():
    mock_client = Mock()
    mock_db = Mock()
    mock_client.get_database.return_value = mock_db
    return mock_client


@pytest.fixture()
def mock_collection():
    mock_collection = Mock(spec=Collection)
    mock_collection.find_one.return_value = None
    return mock_collection


@patch("pymongo.MongoClient")
def test_get_client(mock_mongo_client):
    __get_client()
    mock_mongo_client.assert_called_once_with(MONGO_LINK)
    mock_mongo_client().get_database.assert_called_once_with(MONGO_DATABASE)


def test_get_collection_with_client():
    mock_client = Mock()
    get_collection(KIND_USERS)
    mock_client.get_collection.assert_called_once_with(KIND_USERS)


def test_get_collection_without_client():
    with pytest.raises(Exception):
        get_collection(KIND_USERS)


@patch("mongo.__get_client", return_value=mock_client())
def test_store_user(mock_get_client):
    user = {"login": "test_user", "name": "Test User"}
    mock_user_collection = mock_client().get_collection.return_value
    mock_user_collection.find_one.return_value = None

    store_user(user)

    mock_user_collection.insert_one.assert_called_once_with(user)


@patch("mongo.__get_client", return_value=mock_client())
def test_store_user_already_exists(mock_get_client):
    user = {"login": "test_user", "name": "Test User"}
    mock_user_collection = mock_client().get_collection.return_value
    mock_user_collection.find_one.return_value = user

    store_user(user)

    mock_user_collection.update_one.assert_called_once_with(
        {"login": "test_user"}, user
    )


@patch("mongo.__get_client", return_value=mock_client())
def test_store_user_with_none(mock_get_client):
    store_user(None)
    mock_user_collection = mock_client().get_collection.return_value
    mock_user_collection.insert_one.assert_not_called()


@patch("mongo.__get_client", return_value=mock_client())
def test_store_project(mock_get_client):
    repo = {"name": "test_repo", "url": "https://github.com/test_user/test_repo"}
    mock_user_project = mock_client().get_collection.return_value
    mock_user_project.find_one.return_value = None

    store_project(repo)

    mock_user_project.insert_one.assert_called_once_with(repo)


@patch("mongo.__get_client", return_value=mock_client())
def test_store_project_already_exists(mock_get_client):
    repo = {"name": "test_repo", "url": "https://github.com/test_user/test_repo"}
    mock_user_project = mock_client().get_collection.return_value
    mock_user_project.find_one.return_value = repo

    store_project(repo)

    mock_user_project.update_one.assert_called_once_with({"name": "test_repo"}, repo)


@patch("mongo.__get_client", return_value=mock_client())
def test_store_project_with_none(mock_get_client):
    store_project(None)
    mock_user_project = mock_client().get_collection.return_value
    mock_user_project.insert_one.assert_not_called()


@patch("mongo.__get_client", return_value=mock_client())
def test_get_one_page_of_users(mock_get_client):
    mock_user_collection = mock_client().get_collection.return_value
