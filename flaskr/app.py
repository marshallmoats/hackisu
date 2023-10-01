from flask import Flask, request

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route("/api/test", methods=["GET"])
def test_endpoint():
    return request.args


if __name__ == '__main__':
    app.run(ssl_context='adhoc')
