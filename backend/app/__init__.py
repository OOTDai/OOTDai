# This file is the entry point for the Flask application
# This is where you create and configure the app via a factory function (create_app)

from flask import Flask
from flask_cors import CORS
import os
import logging
from dotenv import load_dotenv

# load the environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

    @app.route('/')
    def test_route():
        return {"message": "Hello! Your Flask backend is working correctly!"}, 200

    return app

