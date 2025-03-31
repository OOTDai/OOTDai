# This file contains the routes for the Flask application
# It defines the endpoints and the logic for handling requests

import os
import logging
from flask import Blueprint, jsonify, request

# Configure basic logging
logging.basicConfig(level=logging.INFO)

bp = Blueprint('main', __name__)

@bp.route('/test', methods=['GET'])
def test_connection():
    return jsonify({"status": "success", "message": "Successfully connected to Flask backend!"}), 200

@bp.route('/analyze-image', methods=['POST'])
def analyze_image():
    if 'image' not in request.files:
        logging.error("No image file found in request")
        return jsonify({"status": "error", "message": "No image file part"}), 400

    file = request.files['image']

    if file.filename == '':
        logging.error("No selected file")
        return jsonify({"status": "error", "message": "No selected file"}), 400

    if file:
        try:
            # Get file size
            file.seek(0, os.SEEK_END) # Go to the end of the file
            file_size = file.tell() # Get the current position (which is the size)
            file.seek(0) # Reset cursor position for any further operations

            # Get file type (extension)
            filename = file.filename
            file_type = os.path.splitext(filename)[1].lower() if '.' in filename else 'unknown'

            # Log the information
            logging.info(f"Received image: {filename}, Size: {file_size} bytes, Type: {file_type}")

            # You could add more analysis here if needed

            return jsonify({
                "status": "success",
                "message": "Image analyzed successfully",
                "filename": filename,
                "size_bytes": file_size,
                "type": file_type
            }), 200

        except Exception as e:
            logging.error(f"Error processing image: {e}")
            return jsonify({"status": "error", "message": f"Error processing image: {e}"}), 500

    # Fallback if 'file' is somehow false after checks (shouldn't happen often)
    return jsonify({"status": "error", "message": "File processing failed"}), 500
