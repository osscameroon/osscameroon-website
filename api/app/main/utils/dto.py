from flask_restplus import Namespace


class ApiDto:
    github_api = Namespace('github', description='github related operations')
