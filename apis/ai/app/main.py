from flask import Flask, jsonify, request
from flask_cors import CORS
import base64
from app.openai_utils import describe_image

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({"message": "OOTDai AI API is running!"})


@app.route('/analyze-clothing', methods=['POST'])
def analyze_clothing():
    image_data = None

    # 1. Handle base64 from JSON
    if request.is_json:
        data = request.get_json()
        image_data = data.get('image')

    # 2. Handle raw file upload (e.g. from camera or file picker)
    elif 'image' in request.files:
        uploaded_file = request.files['image']
        if uploaded_file and uploaded_file.filename != "":
            image_bytes = uploaded_file.read()
            image_data = base64.b64encode(image_bytes).decode('utf-8')

    # 3. Return error if no image
    if not image_data:
        return jsonify({"error": "No valid image provided"}), 400

    try:
        description = describe_image(image_data)
        return jsonify({"description": description})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/suggest-outfit', methods=['POST'])
def suggest_outfit():
    return jsonify({
        "outfit_suggestion": "Pair this with slim-fit jeans and Chelsea boots for an edgy look."
    })


if __name__ == '__main__':
    app.run(debug=True)
