import json

import pytest
from flask import Flask

from app.main import create_app


@pytest.fixture
def app() -> Flask:
    return create_app(
        'dev'
    )

def test_get_top_tweets(app: Flask) -> None:
    client = app.test_client()

    response = client.get('/top-tweets')

    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, dict)
    assert "top_tweets" in data
    assert isinstance(data["top_tweets"], list)


def test_get_top_tweets_with_custom_count(app: Flask) -> None:
    client = app.test_client()

    response = client.get('/top-tweets?count=10')

    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, dict)
    assert "top_tweets" in data
    assert isinstance(data["top_tweets"], list)
    assert len(data["top_tweets"]) == 10


def test_get_top_tweets_with_invalid_count(app: Flask) -> None:
    client = app.test_client()

    response = client.get('/top-tweets?count=abc')

    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, dict)
    assert "error" in data
    assert data["error"] == "Invalid count parameter"


def test_get_top_tweets_with_negative_count(app: Flask) -> None:
    client = app.test_client()

    response = client.get('/top-tweets?count=-5')

    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, dict)
    assert "error" in data
    assert data["error"] == "Invalid count parameter"


def test_get_top_tweets_with_zero_count(app: Flask) -> None:
    client = app.test_client()

    response = client.get('/top-tweets?count=0')

    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, dict)
    assert "error" in data
    assert data["error"] == "Invalid count parameter"
