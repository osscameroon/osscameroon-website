from flask_restplus import Namespace


class ApiDto:
    api = Namespace('github',
                    description='github related operations')
