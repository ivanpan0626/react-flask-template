from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from os import path

db = SQLAlchemy()
DB_NAME = "database.db"

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'hjshjhdjah kjshkjdhjs'
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = "sasdasdsadsadasd"
    jwt = JWTManager(app)
    CORS(app)
    db.init_app(app)

    from .auth import auth
    app.register_blueprint(auth, url_prefix='/')

    with app.app_context():
        db.create_all()

    return app

def create_database(app):
    if not path.exists('server/' + DB_NAME):
        db.create_all(app=app)
        print('Created Database!')