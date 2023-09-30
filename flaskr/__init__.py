import os

from . import db

from flask import Flask, request

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
    def index():
        return 'Homepage'

    @app.route('/register/<username>', methods = ['POST'])
    def register(username):
        database = db.get_db()

        if len(username) < 4:
            return "Username must be at least 4 characters."
        
        try:
            database.execute(
                "INSERT INTO user (username) VALUES (?)",
                (username,),
            )
            database.commit()
        except database.IntegrityError as e:
            return f"{e}"
            # return f"User {username} is already registered."
        else:
            return "User successfully registered."
    
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
    
    @app.route('/markets/all')
    def all_markets():
        return [
            {
                "id": 0,
                "name": "Ames Farmers' Market",
                "user_ids": [0, 1, 5, 9],
                "lat": 42.023680,
                "long": -93.649614,
            },
            {
                "id": 1,
                "name": "Des Moines Farmers' Market",
                "user_ids": [13, 200, 4, 6],
                "lat": 41.596464,
                "long": -93.688780
            }
        ]

    @app.route('/markets/join/<market_id>/<user_id>', methods = ['POST'])
    def create_market(market_id, user_id):
        database = db.get_db()
        try:
            database.execute(
                "INSERT OR REPLACE INTO uid_mid (user_id, market_id) VALUES (?, ?)",
                (user_id, market_id)
            )
            database.commit()
        except Exception as e:
            return e
        
        return "Successfully joined market."

    @app.route('/markets/<market_id>', methods = ['GET', 'POST', 'DELETE'])
    def market(market_id):
        database = db.get_db()
        cur = database.cursor()
        try:
            cur.execute(
                "SELECT * FROM uid_mid WHERE market_id = (?)",
                (market_id,)
            )
        except Exception as e:
            return e

        return [row[0] for row in cur.fetchall()]

    @app.route('/image/<image_id>')
    def get_image(image_id):
        pass

    @app.route('/image/upload', methods = "POST")
    def upload_image():
        img = request.files['image']

        if image:
            # Read the binary data of the image
            image_data = image.read()

            # Store the image data in the database
            conn = sqlite3.connect('images.db')
            cursor = conn.cursor()
            cursor.execute('INSERT INTO images (image_data) VALUES (?)', (image_data,))
            conn.commit()
            conn.close()
            return "Image uploaded successfully."
        else:
            return "No image provided."

    return app
