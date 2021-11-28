from app import app, db
from flask_cors import cross_origin
from app.models import Post
from flask import jsonify
from datetime import datetime


@app.route("/posts")
@cross_origin()
def posts_shown():
    posts = Post.query.all()
    return jsonify({"posts": [post.json() for post in posts]})

# @app.route("/add-post", methods=['POST'])
# @cross_origin()
# def add_post():
    # data = request.get_json()
    # new_post = {
    #     "authorName": data["authorName"],
    #     "postBody": data["postBody"],
    #     "imageField": data["imageField"]
    # }
    # posts.append(new_post)
    # return jsonify({"posts": posts})
