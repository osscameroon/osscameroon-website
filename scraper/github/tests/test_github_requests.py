from app.utils.github_requests import GithubClient
import requests


def test_success_status_check():
    # We test the success request status
    github_cli = GithubClient()
    r = requests.get("https://google.com")

    assert github_cli.status_check(r) == (True, {})
