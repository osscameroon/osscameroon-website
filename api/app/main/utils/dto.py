from flask_restplus import Namespace


class ApiDto:
    api = Namespace('github-users',
                    description='github users related operations')
