import unittest

from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

from app import blueprint
from app.main import create_app
from app.main.config import app_port, app_host

app = create_app('dev')

app.register_blueprint(blueprint)
app.app_context().push()

manager = Manager(app)

@manager.command
def run():
    app.run(host=app_host, port=app_port)


if __name__ == '__main__':
    manager.run()
