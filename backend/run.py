#this file is used to run the Flask application
#script: python run.py

# Import the create_app function from the app module
from app import create_app

# Create an instance of the Flask application
app = create_app()

# Check if this script is being run directly (not imported as a module)
if __name__ == '__main__':
    # Run the Flask application with debug mode enabled
    # This allows for automatic reloading and provides detailed error messages
    app.run(debug=True, host='0.0.0.0', port=5001)