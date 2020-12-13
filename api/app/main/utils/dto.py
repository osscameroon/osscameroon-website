from flask_restplus import Namespace, fields


class ApiDto:
    api = Namespace('github-users', description='github users related operations')

    github_user = api.model('github-users', {
        'key': fields.String(required=True, description='The key generated from secret and mobileUUID'),
        'avatar_url': fields.String(required=True, description='The secret string'),
        'bio': fields.String(required=True, description='The secret string'),
        'blog': fields.String(required=True, description='The secret string'),
        'company': fields.String(required=True, description='The secret string'),
        'created_at': fields.String(required=True, description='The secret string'),
        'email': fields.String(required=True, description='The secret string'),
        'events_url': fields.String(required=True, description='The secret string'),
        'followers': fields.String(required=True, description='The secret string'),
        'followers_url': fields.String(required=True, description='The secret string'),
        'following': fields.String(required=True, description='The secret string'),
        'following _url': fields.String(required=True, description='The secret string'),
        'gists_url': fields.String(required=True, description='The secret string'),
        'gravatar_id': fields.String(required=True, description='The secret string'),
        'hireable': fields.String(required=True, description='The secret string'),
        'html_url': fields.String(required=True, description='The secret string'),
    })
