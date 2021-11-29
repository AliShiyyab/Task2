from datetime import datetime
from app import app, db


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    postBody = db.Column(db.String(1400))
    authorName = db.Column(db.String(200))
    imageField = db.Column(db.String(1400))
    timestamp = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    def json(self):
        return {
            "id": self.id,
            "postBody": self.postBody,
            "authorName": self.authorName,
            "imageField": self.imageField,
            "timestamp": self.timestamp,
        }

    def __repr__(self):
        return '<Post {}>'.format(self.timestamp)
