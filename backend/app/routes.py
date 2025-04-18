# This file contains the routes for the Flask application
# It defines the endpoints and the logic for handling requests

import os
import logging
from flask import Blueprint, jsonify, request
from PIL import Image
import io
import base64 # Added for encoding image data
from openai import OpenAI # Added for OpenAI API
import traceback # Keep for detailed error logging

# Configure basic logging
logging.basicConfig(level=logging.INFO)

# Configure OpenAI Client - Ensure OPENAI_API_KEY is set in your environment
try:
    client = OpenAI()
    # Test connection (optional, remove in production if noisy)
    # client.models.list()
    logging.info("OpenAI client initialized successfully.")
except Exception as e:
    logging.error(f"Failed to initialize OpenAI client: {e}. Ensure OPENAI_API_KEY is set.")
    # Depending on requirements, you might want to exit or disable the feature
    client = None # Set client to None if initialization fails

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

<<<<<<< HEAD
@bp.route('/analyze-image', methods=['POST'])
=======
@bp.route('/analyze-clothing', methods=['POST'])
>>>>>>> dev
def analyze_image():
    if not client: # Check if OpenAI client failed to initialize
         logging.error("OpenAI client not available.")
         return jsonify({"status": "error", "message": "OpenAI service is not configured or available."}), 503 # Service Unavailable

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

            # --- OpenAI API Call ---
            logging.info("Sending processed image to OpenAI for analysis...")

            # Encode image data to base64
            base64_image = base64.b64encode(processed_image_data.getvalue()).decode('utf-8')

            # Prepare the prompt for OpenAI
            prompt_text = "analyze this article of clothing and return a short but detailed response about it. Make to sure to include the main color of the item, brand if visible, season, type of item of clothing"

            # Make the API call
            response = client.chat.completions.create(
                model="gpt-4-turbo",
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt_text},
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{base64_image}"
                                }
                            },
                        ],
                    }
                ],
                max_tokens=600
            )

            # Extract the analysis result
<<<<<<< HEAD
=======
            logging.info(f"🔍 Full OpenAI response: {response}")

>>>>>>> dev
            analysis_result = response.choices[0].message.content
            logging.info("Received analysis from OpenAI.")
            # --- End OpenAI API Call ---

            return jsonify({
                "status": "success",
                "message": "Image analyzed successfully",
<<<<<<< HEAD
                "analysis": analysis_result # Include the analysis in the response
=======
                "description": analysis_result # Include the analysis in the response
>>>>>>> dev
            }), 200

        except ValueError as ve: # Catch specific processing errors (like compression failure)
            logging.error(f"Image processing error: {ve}")
            return jsonify({"status": "error", "message": str(ve)}), 400
<<<<<<< HEAD
        except Exception as e: # Catch general errors, including OpenAI API errors
            logging.error(f"Error during image analysis: {e}")
            logging.error(traceback.format_exc()) # Log detailed traceback
            # Check if it's an OpenAI API error and provide more specific feedback if possible
            if "openai" in str(e).lower():
                 return jsonify({"status": "error", "message": f"OpenAI API error: {e}"}), 502 # Bad Gateway or specific OpenAI error code
            else:
                 return jsonify({"status": "error", "message": f"An unexpected error occurred: {e}"}), 500
=======
        # except Exception as e: # Catch general errors, including OpenAI API errors
        #     logging.error(f"Error during image analysis: {e}")
        #     logging.error(traceback.format_exc()) # Log detailed traceback
        #     # Check if it's an OpenAI API error and provide more specific feedback if possible
        #     if "openai" in str(e).lower():
        #          return jsonify({"status": "error", "message": f"OpenAI API error: {e}"}), 502 # Bad Gateway or specific OpenAI error code
        #     else:
        #          return jsonify({"status": "error", "message": f"An unexpected error occurred: {e}"}), 500
        except Exception as e:
            full_trace = traceback.format_exc()
            logging.error(f"Unhandled error during image analysis: {e}")
            logging.error(full_trace)

        return jsonify({
            "status": "error",
            "message": f"Internal Server Error: {str(e)}",
            "trace": full_trace  # You can remove this in production
        }), 500

>>>>>>> dev

    # Fallback if 'file' is somehow false after checks
    return jsonify({"status": "error", "message": "File processing failed"}), 500
