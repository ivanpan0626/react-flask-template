from flask import request, jsonify, redirect, Blueprint
from . import db
from .models import User
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

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

    user = User.query.filter_by(email=email).first()
    if user:
            if check_password_hash(user.password, password):
                access_token = create_access_token(identity=email)
                print(access_token)
                return jsonify({"token": access_token}), 200
            else:
                return jsonify({"message": "Wrong Email or Password!"}), 404
            
    return jsonify({"message": "Didn't work!"}), 400

@auth.route('/get-user', methods=["GET"])
@jwt_required()
def logout():
    current_user = get_jwt_identity()
    return jsonify({"user": current_user}), 200