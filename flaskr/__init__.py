import os
import requests

from . import db

from flask import Flask, request, make_response

from flask_cors import CORS

def query_db(query, args=(), one=False):
    database = db.get_db()
    cur = database.cursor()
    cur.execute(query, args)
    r = [dict((cur.description[i][0], value) \
               for i, value in enumerate(row)) for row in cur.fetchall()]
    database.commit()
    return (r[0] if r else None) if one else r



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
    
    @app.route('/item/<id>')
    def item(id):
        result = query_db("SELECT * FROM item WHERE id = (?)", (id,), True)
        return result

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
            return f"{e}"

        return [
            {
                "id": market[0],
                "name": market[1],
                "lat": market[2],
                "long": market[3],
                "desc": market[4],
                "user_ids": market_userids(market[0]),
                "start_time": market[5],
                "end_time": market[6]
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
                "UPDATE user SET market_id = (?) WHERE id = (?)",
                (market_id, user_id)
            )
            database.commit()
        except Exception as e:
            return e
        
        return "Successfully joined market."

    @app.route('/markets/<market_id>/userids', methods = ['GET', 'POST', 'DELETE'])
    def market_userids(market_id):
        database = db.get_db()
        cur = database.cursor()
        try:
            cur.execute(
                "SELECT id FROM user WHERE market_id = (?)",
                (market_id,)
            )
        except Exception as e:
            return e

        return [row[0] for row in cur.fetchall()]
    
    @app.route('/markets/<id>/users')
    def market_users(id):
        results = query_db('SELECT * FROM user WHERE market_id = (?)', (id,))
        return results

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
            return f"{e}"
        image_binary = cur.fetchall()[0][1]
        print(image_binary)
        response = make_response(image_binary)
        response.headers.set('Content-Type', 'image/jpeg')
        response.headers.set(
            'Content-Disposition',
            'attachment', filename='%s.jpg' % image_id)
        print(response)
        return response

    @app.route('/image/upload', methods = ["POST"])
    def upload_image():
        image = request.files['image']

        image.save()
        return "Image uploaded successfully."

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
                "INSERT INTO item (name, qty, vendor, price, desc, img) VALUES (?, ?, ?, ?, ?, ?)",
                (j.get('name'), j.get('qty'), j.get('vendor'), j.get('price'), j.get('desc'), request.files.get('image'))
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
                "SELECT id FROM item WHERE vendor = (?)",
                (id,)
            )
        except Exception as e:
            return e
        
        return [row[0] for row in cur.fetchall()]

    @app.route('/markets/<id>/items')
    def market_items(id):
        vendors = market_userids(id)
        iids = []
        for uid in vendors:
            iids += user_items(uid)
        return [
            item(iid) for iid in iids
        ]
    
    @app.route('/users/all')
    def all_users():
        results = query_db('SELECT * FROM user', ())
        return results

    @app.route('/sqlquery', methods = ['POST'])
    def sql_query():
        query = request.get_data().decode('ascii')
        print(query)

        return str(query_db(query, ()))

    @app.route('/image/scan', methods = ['POST'])
    def scan_image():
        img = request.files['image']


    return app

# app = create_app()

# # from OpenSSL import SSL
# # context = SSL.Context(SSL.PROTOCOL_TLSv1_2)
# # context.use_privatekey_file('server.key')
# # context.use_certificate_file('server.crt') 

# import ssl
# context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
# context.load_cert_chain('server.crt', 'server.key')

# if __name__ == '__main__':  
#     app.run('127.0.0.1', debug=True, ssl_context=('/home/marshall/src/hackisu/server.crt', '/home/marshall/src/hackisu/server.key'))