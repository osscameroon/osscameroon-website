from flask_restplus import Namespace, fields


class ApiDto:
    api = Namespace('github-users',
                    description='github users related operations')
