from app import app, db
from flask_cors import cross_origin, CORS
from app.models import Post
from flask import jsonify, request

cors = CORS(app)

# Validate Post Data Function


def validate_post_data(data):
    if 'authorName' != "" and 'postBody' != "" and 'imageField' != "":
        return True
    else:
        return False

# Routes


@app.route("/posts", methods=['GET'])
@cross_origin()
def posts_shown():
    posts = Post.query.order_by(Post.timestamp.desc()).all()
    if validate_post_data(posts):
        return jsonify({"posts": [post.json() for post in posts]})
    else:
        return jsonify({"error": "The data is empty"})


@app.route("/posts", methods=['POST'])
@cross_origin()
def add_post():
    data = request.get_json()
    new_post = Post(authorName=data["authorName"], postBody=data["postBody"], imageField=data["imageField"])
    if len(new_post.authorName) > 0 or len(new_post.postBody) > 0:
        db.session.add(new_post)
        db.session.commit()
        return jsonify({"post": new_post.json()})
    else:
        return jsonify({"post": "One Of these fields is Empty"})


@app.route("/posts/<int:id>", methods=['DELETE'])
@cross_origin()
def delete_post(id):
    post_to_delete = Post.query.get_or_404(id)
    db.session.delete(post_to_delete)
    db.session.commit()
    return jsonify({"messages": "Deleted Successfully"})


@app.route("/posts/<int:id>", methods=['PUT'])
@cross_origin()
def update_post(id):
    # post_to_update = Post.query.get_or_404(id)
    data = request.get_json()
    post = Post.query.filter_by(id=id).first()
    post.authorName = data["authorName"]
    post.postBody = data["postBody"]
    db.session.add(post)
    db.session.commit()
    return jsonify({"messages": "Updated Successfully"})
