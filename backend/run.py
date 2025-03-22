import sys
import os

# Ensure the app directory is in the Python path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app import create_app
from app.models import db  # This should work if models is properly set up
from app.services.data_cleaning import process_data_cleaning

app = create_app()

with app.app_context():
    db.create_all()
    process_data_cleaning()

if __name__ == "__main__":
    app.run(debug=True)
