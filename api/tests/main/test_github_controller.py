# import json

# import pytest
# from flask import Flask

# from app.main import create_app


# @pytest.fixture
# def app() -> Flask:
#     return create_app(
#         'dev'
#     )

# def test_get_all_users(app: Flask) -> None:
#     client = app.test_client()

#     response = client.get('/users')

#     assert response.status_code == 200
#     data = json.loads(response.data)
#     assert isinstance(data, list)


# def test_get_user(app: Flask) -> None:
#     client = app.test_client()

#     response = client.get('/users/elhmne')

#     assert response.status_code == 200
#     data = json.loads(response.data)
#     assert isinstance(data, dict)


# def test_search_users(app: Flask) -> None:
#     client = app.test_client()

#     response = client.get('/users/search?query=test')

#     assert response.status_code == 200
#     data = json.loads(response.data)
#     assert isinstance(data, list)


# def test_post_search_users(app: Flask) -> None:
#     client = app.test_client()

#     data = {
#         "query": "test",
#         "page": 1,
#         "count": 20,
#         "sort_type": "most_recent"
#     }

#     response = client.post('/users/search', json=data)

#     assert response.status_code == 200
#     data = json.loads(response.data)
#     assert isinstance(data, list)


# def test_get_project(app: Flask) -> None:
#     client = app.test_client()

#     response = client.get('/projects/node-openerp')

#     assert response.status_code == 200
#     data = json.loads(response.data)
#     assert isinstance(data, dict)


# def test_get_all_projects(app: Flask) -> None:
#     client = app.test_client()

#     response = client.get('/projects')

#     assert response.status_code == 200
#     data = json.loads(response.data)
#     assert isinstance(data, list)


# def test_search_projects(app: Flask) -> None:
#     client = app.test_client()

#     response = client.get('/projects/search?query=test')

#     assert response.status_code == 200
#     data = json.loads(response.data)
#     assert isinstance(data, list)


# def test_post_search_projects(app: Flask) -> None:
#     client = app.test_client()

#     data = {
#         "query": "test",
#         "page": 1,
#         "count": 20,
#         "languages": ["python", "java"],
#         "sort_type": "most_recent"
#     }

#     response = client.post('/projects/search', json=data)

#     assert response.status_code == 200
#     data = json.loads(response.data)
#     assert isinstance(data, list)


# def test_get_languages(app: Flask) -> None:
#     client = app.test_client()

#     response = client.get('/languages')

#     assert response.status_code == 200
#     data = json.loads(response.data)
#     assert isinstance(data, list)
