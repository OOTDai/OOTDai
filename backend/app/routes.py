# This file contains the routes for the Flask application
# It defines the endpoints and the logic for handling requests

from flask import Blueprint, jsonify

bp = Blueprint('main', __name__)

@bp.route('/test', methods=['GET'])
def test_connection():
    return jsonify({"status": "success", "message": "Successfully connected to Flask backend!"}), 200



