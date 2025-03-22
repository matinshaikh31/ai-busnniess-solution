import os
import json
import logging

# Define the path for storing suppliers
SUPPLIERS_FILE = os.path.join(os.getcwd(), "data", "suppliers.json")

# Ensure the `data` directory exists
os.makedirs(os.path.dirname(SUPPLIERS_FILE), exist_ok=True)

# Logger setup
logging.basicConfig(level=logging.ERROR)

def load_suppliers():
    if os.path.exists(SUPPLIERS_FILE):
        try:
            with open(SUPPLIERS_FILE, "r") as file:
                data = json.load(file)
                return data if isinstance(data, list) else []
        except (json.JSONDecodeError, ValueError) as e:
            logging.error(f"Error loading suppliers JSON: {e}")
            return []
    return []

def save_suppliers(suppliers):
    try:
        with open(SUPPLIERS_FILE, "w") as file:
            json.dump(suppliers, file, indent=4)
    except Exception as e:
        logging.error(f"Error saving suppliers: {e}")
