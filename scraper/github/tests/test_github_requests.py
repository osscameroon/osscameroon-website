from app.utils.github_requests import *


def test_success_status_check():
    # We test the success request status
    r = requests.get("https://google.com")

    assert status_check(r) == (True, {})
