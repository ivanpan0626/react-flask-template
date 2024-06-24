from flask import request, jsonify, redirect, Blueprint, make_response
from . import db, jwt
from datetime import datetime, timedelta, timezone
from .models import User
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, jwt_required, current_user, unset_jwt_cookies, set_access_cookies
from werkzeug.security import generate_password_hash, check_password_hash

@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()

auth = Blueprint('auth', __name__)

@auth.route("/signup", methods=["POST"])
def signup():
    email = request.json.get('email')
    username = request.json.get('username')
    password1 = request.json.get('password1')
    password2 = request.json.get('password2')

    if not username or not email:
        return (
            jsonify({"message": "You must include a first name and email"}),
            400,
        )

    new_user = User(email=email, username=username, password=generate_password_hash(
            password1, method='scrypt'))
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created!"}), 201

@auth.route("/login", methods=["POST"])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    user = User.query.filter_by(email=email).one_or_none()
    if user:
            if check_password_hash(user.password, password):
                access_token = create_access_token(identity=user)
                return jsonify({"token": access_token}), 200
            else:
                return jsonify({"message": "Wrong Email or Password!"}), 404
            
    return jsonify({"message": "Didn't work!"}), 400

@auth.route('/get-user', methods=["GET"])
@jwt_required()
def get_user():
    return jsonify({"user": current_user.id}), 200