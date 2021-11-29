import requests

from app import app, db
from flask_cors import cross_origin
from app.models import Post
from flask import jsonify, request
from datetime import datetime


@app.route("/posts")
@cross_origin()
def posts_shown():
    posts = Post.query.order_by(Post.timestamp.desc()).all()
    return jsonify({"posts": [post.json() for post in posts]})


@app.route("/add-post", methods=['POST'])
@cross_origin()
def add_post():
    data = request.get_json()
    new_post = Post(authorName=data["authorName"], postBody=data["postBody"], imageField=data["imageField"])
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"post": new_post.json()})


@app.route("/delete_post/<int:id>", methods=['DELETE'])
@cross_origin()
def delete_post(id):
    post_to_delete = Post.query.get_or_404(id)
    db.session.delete(post_to_delete)
    db.session.commit()
    return jsonify({"messages": "Deleted Successfully"})


@app.route("/update_post/<int:id>", methods=['PUT'])
@cross_origin()
def update_post(id):
    # post_to_update = Post.query.get_or_404(id)
    data = request.get_json()
    post = Post.query.filter_by(id=id).first()
    if not post:
        return 'error message', 404
    else:
        post.authorName = data['authorName']
        post.postBody = data['postBody']
        post.imageField = data['imageField']
    db.session.add(post)
    db.session.commit()
    return jsonify({"messages": "Updated Successfully"})
