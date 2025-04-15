# encode_image.py
from PIL import Image
import base64
from io import BytesIO
import json
import os

# Load image and convert to JPEG
img_path = "test_image.jpg"
img = Image.open(img_path).convert("RGB")
buffered = BytesIO()
img.save(buffered, format="JPEG")
img_base64 = base64.b64encode(buffered.getvalue()).decode()

# Save JSON payload
payload = {
    "image": img_base64
}

os.makedirs("dummy", exist_ok=True)
with open("dummy/input_image.json", "w") as f:
    json.dump(payload, f)

print("✅ input_image.json created.")
