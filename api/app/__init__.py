from flask_restplus import Api as TheAPI
from flask import Blueprint, url_for

from app.main.controller.github_controller import api as github
from app.main.controller.twitter_controller import api as twitter
from app.main.config import app_port

blueprint = Blueprint('api', __name__)


class Api(TheAPI):
    @property
    def specs_url(self):
        """Monkey patch for HTTPS"""
        scheme = 'http' if app_port in self.base_url else 'https'
        return url_for(self.endpoint('specs'), _external=True, _scheme=scheme)


api = Api(blueprint,
          title='CAPARLEDEV RESTPLUS API ',
          version='1.0',
          description='The Backend of the platform CaParleDev.')

api.add_namespace(github)
api.add_namespace(twitter)
