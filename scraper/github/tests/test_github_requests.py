import pytest
import requests_mock

from app.settings import GITHUB_API, GITHUB_TOKEN
from github_requests import GithubClient
from datetime import date
from typing import List


@pytest.fixture(scope="module")
def client():
    return GithubClient()


def test_get_users_with_mocked_response():
    with requests_mock.Mocker() as m:
        m.get(
            f"{GITHUB_API}/search/users?q=created:%3C{str(date.today())}"
            "+sort:joined-desc+location:%22cameroon%22+location:%22cameroun%22"
            "&page=1&per_page=100",
            json={
                "total_count": 1,
                "incomplete_results": False,
                "items": [
                    {
                        "login": "test_user",
                        "id": 123456,
                        "node_id": "MDQ6VXNlcjE=",
                        "avatar_url": "https://avatars.githubusercontent.com/u/123456?v=4",
                        "gravatar_id": "",
                        "url": "https://api.github.com/users/test_user",
                        "html_url": "https://github.com/test_user",
                        "followers_url": "https://api.github.com/users/test_user/followers",
                        "following_url": "https://api.github.com/users/test_user/following{/other_user}",
                        "gists_url": "https://api.github.com/users/test_user/gists{/gist_id}",
                        "starred_url": "https://api.github.com/users/test_user/starred{/owner}{/repo}",
                        "subscriptions_url": "https://api.github.com/users/test_user/subscriptions",
                        "organizations_url": "https://api.github.com/users/test_user/orgs",
                        "repos_url": "https://api.github.com/users/test_user/repos",
                        "events_url": "https://api.github.com/users/test_user/events{/privacy}",
                        "received_events_url": "https://api.github.com/users/test_user/received_events",
                        "type": "User",
                        "site_admin": False,
                    }
                ],
            },
        )

        def on_pageloaded_success(client, users):
            assert isinstance(users, list)
            assert len(users) == 1
            assert users[0]["login"] == "test_user"

        client = GithubClient()
        result = client.get_users(
            pagination_limit=1, on_pageloaded_success=on_pageloaded_success
        )

        assert isinstance(result, list)
        assert len(result) == 1
        assert result[0]["login"] == "test_user"


def test_get_users_with_mocked_error_response(client):
    with requests_mock.Mocker() as m:
        m.get(
            f"{GITHUB_API}/search/users?q=created%3A%3C2023-04-01+sort%3Ajoined-desc+location%3A%22cameroon%22+location%3A%22cameroun%22&page=1&per_page=100",
            status_code=500,
            json={"message": "Internal Server Error"},
        )

        result = client.get_users(pagination_limit=1)

        assert isinstance(result, dict)
        assert "status" in result
        assert "message" in result


def test_get_user_with_mocked_response(client):
    with requests_mock.Mocker() as m:
        m.get(
            f"{GITHUB_API}/users/test_user",
            json={
                "login": "test_user",
                "id": 123456,
                "node_id": "MDQ6VXNlcjE=",
                "avatar_url": "https://avatars.githubusercontent.com/u/123456?v=4",
                "gravatar_id": "",
                "repos_url": "https://api.github.com/users/test_user/repos",
                "events_url": "https://api.github.com/users/test_user/events{/privacy}",
                "received_events_url": "https://api.github.com/users/test_user/received_events",
                "type": "User",
                "site_admin": False,
                "name": "Test User",
                "company": None,
                "blog": "",
                "location": "Cameroon",
                "email": None,
                "hireable": None,
                "bio": None,
                "twitter_username": None,
                "public_repos": 5,
                "public_gists": 0,
                "followers": 0,
                "following": 0,
                "created_at": "2018-06-19T14:39:32Z",
                "updated_at": "2023-04-01T12:00:00Z",
                "permissions": {"admin": True, "push": True, "pull": True},
            },
        )

    result = client.get_user_repos("test_user")

    assert isinstance(result, list)
    assert len(result) == 1
    assert result[0]["name"] == "test_repo"


def test_get_user_repos_with_mocked_error_response(client):
    with requests_mock.Mocker() as m:
        m.get(f"{GITHUB_API}/users/test_user/repos", status_code=404)
        result = client.get_user_repos("test_user")

    assert isinstance(result, dict)
    assert "status" in result
    assert "message" in result
