# This file contains the routes for the Flask application
# It defines the endpoints and the logic for handling requests

import os
import logging
from flask import Blueprint, jsonify, request
from PIL import Image # Added for image processing
import io # Added for handling image data in memory

# Configure basic logging
logging.basicConfig(level=logging.INFO)

bp = Blueprint('main', __name__)

MAX_FILE_SIZE_MB = 4
MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

def process_image(file_storage):
    """
    Processes the uploaded image:
    1. Converts to JPEG if not already JPEG or PNG.
    2. Compresses the image if it exceeds MAX_FILE_SIZE_BYTES, maintaining JPEG format.
    Returns a BytesIO object containing the processed image data and the final file size.
    """
    try:
        img = Image.open(file_storage.stream)
        output_format = 'JPEG' # Target format
        original_format = img.format.upper() if img.format else 'UNKNOWN'

        logging.info(f"Original image format: {original_format}")

        # Convert to RGB if necessary (e.g., for PNG with transparency)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")

        # Use BytesIO to handle image data in memory
        img_byte_arr = io.BytesIO()

        # Initial save to check size
        img.save(img_byte_arr, format=output_format)
        file_size = img_byte_arr.tell()
        logging.info(f"Initial size after conversion (if any) to {output_format}: {file_size} bytes")

        # Compress if necessary
        quality = 95 # Start with high quality
        while file_size > MAX_FILE_SIZE_BYTES and quality > 10:
            logging.info(f"Image size ({file_size} bytes) exceeds limit ({MAX_FILE_SIZE_BYTES} bytes). Compressing with quality {quality}...")
            img_byte_arr = io.BytesIO() # Reset buffer
            img.save(img_byte_arr, format=output_format, quality=quality, optimize=True)
            file_size = img_byte_arr.tell()
            quality -= 5 # Decrease quality for next attempt

        if file_size > MAX_FILE_SIZE_BYTES:
            logging.error(f"Could not compress image below {MAX_FILE_SIZE_MB}MB even at lowest quality.")
            raise ValueError(f"Image compression failed. Size remains above {MAX_FILE_SIZE_MB}MB.")

        img_byte_arr.seek(0) # Reset buffer pointer for reading
        logging.info(f"Final image size: {file_size} bytes, Format: {output_format}")
        return img_byte_arr, file_size

    except Exception as e:
        logging.error(f"Error during image processing: {e}")
        raise # Re-raise the exception to be caught by the route handler

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
            original_filename = file.filename
            logging.info(f"Received image: {original_filename}")

            # Process the image (convert/compress)
            processed_image_data, final_size = process_image(file)

            # --- Placeholder for OpenAI API call ---
            # Here you would typically send `processed_image_data` to the OpenAI API
            # For now, we just log and return info about the processed image
            logging.info("Image processed successfully. Ready for OpenAI API.")
            # --- End Placeholder ---

            # Create a new filename reflecting the change to JPEG if needed
            base, _ = os.path.splitext(original_filename)
            processed_filename = f"{base}_processed.jpg"

            return jsonify({
                "status": "success",
                "message": "Image processed successfully and ready for analysis",
                "original_filename": original_filename,
                "processed_filename": processed_filename, # Indicate the new format
                "processed_size_bytes": final_size,
                "processed_type": "jpeg"
            }), 200

        except ValueError as ve: # Catch specific compression errors
            logging.error(f"Image processing error: {ve}")
            return jsonify({"status": "error", "message": str(ve)}), 400 # Bad request due to file issue
        except Exception as e:
            logging.error(f"Error processing image: {e}")
            # Log the full traceback for debugging if possible
            import traceback
            logging.error(traceback.format_exc())
            return jsonify({"status": "error", "message": f"Error processing image: {e}"}), 500

    # Fallback if 'file' is somehow false after checks
    return jsonify({"status": "error", "message": "File processing failed"}), 500
