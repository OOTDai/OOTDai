import base64
# import imghdr #comment out for Python 3.13
import os
from openai import OpenAI

# injection of pillow logic here

def get_image_type(data):
    """Determine image type from binary data using magic numbers"""
    if data.startswith(b'\xff\xd8\xff'):
        return 'jpeg'
    elif data.startswith(b'\x89PNG\r\n\x1a\n'):
        return 'png'
    elif data.startswith(b'GIF87a') or data.startswith(b'GIF89a'):
        return 'gif'
    elif data.startswith(b'RIFF') and data[8:12] == b'WEBP':
        return 'webp'
    else:
        return None

# injection of pillow logic above here

def describe_image(base64_image: str) -> str:
    print("🧪 Preview of base64:", base64_image[:30])

    try:
        image_bytes = base64.b64decode(base64_image)
    except Exception as e:
        raise ValueError(f"❌ Could not decode base64 image: {e}")

    # image_type = imghdr.what(None, h=image_bytes)
    # print(f"🧪 Detected type: {image_type}")
    image_type = get_image_type(image_bytes)  # ✅ use your custom function
    print(f"🧪 Detected type: {image_type}")


    if image_type not in ["jpeg", "png", "gif", "webp"]:
        raise ValueError(f"❌ Unsupported image type: {image_type}")

    mime_type = f"image/{image_type}"

    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Describe this clothing item, color, and style."},
                    {"type": "image_url", "image_url": {
                        "url": f"data:{mime_type};base64,{base64_image}"
                    }}
                ]
            }
        ],
        max_tokens=500
    )

    return response.choices[0].message.content
