import os

from . import db

from flask import Flask, request

from flask_cors import CORS

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
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

    from . import db
    db.init_app(app)

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
    
    @app.route('/markets/all')
    def all_markets():
        database = db.get_db()
        cur = database.cursor()
        try:
            cur.execute(
                "SELECT * FROM market",
                ()
            )
        except Exception as e:
            return e

        return [
            {
                "id": market[0],
                "name": market[1],
                "lat": market[2],
                "long": market[3],
                "desc": market[4],
                "user_ids": market_userids(market[0])
            } for market in cur.fetchall()
        ]

    @app.route('/markets/create', methods = ['POST'])
    def create_market():
        database = db.get_db()
        name = request.json['name']
        lat = request.json['lat']
        long = request.json['long']
        desc = request.json['desc']
        start = request.json['start'] if 'start' in request.json else None
        end = request.json['end'] if 'end' in request.json else None
        try:
            database.execute(
                "INSERT INTO market (market_name, lat, long, desc, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?)",
                (name, lat, long, desc, start, end)
            )
            database.commit()
        except Exception as e:
            return f"{e}"
        return "Market created successfully."

    @app.route('/markets/join/<market_id>/<user_id>', methods = ['POST'])
    def join_market(market_id, user_id):
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

    @app.route('/markets/<market_id>/users', methods = ['GET', 'POST', 'DELETE'])
    def market_userids(market_id):
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
        database = db.get_db()
        cur = database.cursor()
        try:
            cur.execute(
                "SELECT * FROM img WHERE id = (?)",
                (image_id,)
            )
        except Exception as e:
            return e
        print(cur.fetchall())
        return [row[1] for row in cur.fetchall()]

    @app.route('/image/upload', methods = ["POST"])
    def upload_image():
        image = request.files['image']

        if image:
            # Read the binary data of the image
            image_data = image.read()
            database = db.get_db()
            # Store the image data in the database
            cursor = database.cursor()
            database.execute('INSERT INTO img (img_data) VALUES (?)', (image_data,))
            database.commit()
            return "Image uploaded successfully."
        else:
            return "No image provided."

    @app.route('/item/add', methods = ["POST"])
    def add_item():
        j = request.json
        database = db.get_db()
        try:
            database.execute(
                "INSERT INTO item (name, qty, vendor, price, desc) VALUES (?, ?, ?, ?, ?)",
                (j.get('name'), j.get('qty'), j.get('vendor'), j.get('price'), j.get('desc'))
            )
            database.commit()
        except Exception as e:
            return f"{e}"
        return "Item added successfully."
    
    @app.route('/item/<id>/sell/<amt>', methods = ["POST"])
    def sell_item(id, amt):
        database = db.get_db()
        try:
            database.execute(
                "UPDATE item SET qty = qty - (?) WHERE id = (?)",
                (amt, id)
            )
            database.commit()
        except Exception as e:
            return f"{e}"
        return "Item(s) sold successfully."
    
    @app.route('/users/<id>/items')
    def user_items(id):
        database = db.get_db()
        cur = database.cursor()
        try:
            cur.execute(
                "SELECT * FROM item WHERE vendor = (?)",
                (id,)
            )
        except Exception as e:
            return e

        return [row[0] for row in cur.fetchall()]

    @app.route('/markets/<id>/items')
    def market_items(id):
        vendors = market_userids(id)
        res = []
        for uid in vendors:
            res += user_items(uid)
        return res

    return app
