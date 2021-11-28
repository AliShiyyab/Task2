from flask import Flask, jsonify, request
from flask_cors import cross_origin, CORS

app = Flask(__name__)
cors = CORS(app)

posts = [
    {
        "authorName": "Ali",
        "postBody": "Welcome",
        "imageField": "https://pbs.twimg.com/media/EteDGXDXcAQdT5b?format=jpg&name=large"
    },
    {
        "authorName": "Ali",
        "postBody": "Welcome",
        "imageField": "https://pbs.twimg.com/media/EteDGXDXcAQdT5b?format=jpg&name=large"
    }
]


@app.route("/posts")
@cross_origin()
def posts_shown():
    return jsonify({'posts': posts})


@app.route("/add-post", methods=['POST'])
@cross_origin()
def add_post():
    data = request.get_json()
    new_post = {
        "authorName": data["authorName"],
        "postBody": data["postBody"],
        "imageField": data["imageField"]
    }
    posts.append(new_post)
    return jsonify({"posts": posts})


app.run(port=5000, debug=True)
