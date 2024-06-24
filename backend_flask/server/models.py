from . import db, jwt
from flask_login import UserMixin
from sqlalchemy.sql import func
from uuid import uuid4


def get_uuid():
    return uuid4().hex

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(10000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(10000))
    completionTime = db.Column(db.String(150))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class User(db.Model, UserMixin):
    id = db.Column(db.String(100), unique=True, primary_key=True, default=get_uuid)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    username = db.Column(db.String(150), unique=True)
    notes = db.relationship('Note')
    tasks = db.relationship('Task')

    def to_json(self):
        return {
            "id": self.id,
            "firstName": self.username,
            "email": self.email,
        }
