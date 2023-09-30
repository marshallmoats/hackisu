import os

from flask import Flask, request


print("Hello world")

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/')
    def home():
        return 'Homepage'

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!\n'

    
    @app.route('/users/<user_id>', methods = ['GET', 'POST', 'DELETE'])
    def user(user_id):
        if request.method == 'GET':
            return f"{user_id}"
            """return the information for <user_id>"""
        if request.method == 'POST':
            """modify/update the information for <user_id>"""
            # you can use <user_id>, which is a str but could
            # changed to be int or whatever you want, along
            # with your lxml knowledge to make the required
            # changes
            data = request.form # a multidict containing POST data
        if request.method == 'DELETE':
            """delete user with ID <user_id>"""
        else:
            pass
            # POST Error 405 Method Not Allowed

        from . import db
        db.init_app(app)
    
    @app.route('/markets/<market_id>', methods = ['GET', 'POST', 'DELETE'])
    def market(market_id):
        pass

    return app
