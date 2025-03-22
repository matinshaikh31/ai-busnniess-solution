import os
import json

# Get absolute path of the current script
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))  # Adjust path to project root
DATA_PATH = os.path.join(BASE_DIR, "data", "suppliers.json")

print(f"Looking for suppliers.json at: {DATA_PATH}")  # Debugging
print(f"Does file exist? {os.path.exists(DATA_PATH)}")  # Debugging

def load_suppliers():
    """
    Loads suppliers from the JSON file.
    """
    if not os.path.exists(DATA_PATH):
        print(f"Error: File not found at {DATA_PATH}")
        return []

    try:
        with open(DATA_PATH, "r", encoding="utf-8") as file:
            return json.load(file)
    except json.JSONDecodeError:
        print("Error: Invalid JSON format in suppliers.json")
        return []

def search_suppliers(filters):
    """
    Searches suppliers based on industry, location, certifications, etc.
    """
    suppliers = load_suppliers()
    print(f"Loaded {len(suppliers)} suppliers.")  # Debugging
    print("Filters received:", filters)  # Debugging

    filtered_suppliers = []
    for supplier in suppliers:
        if filters.get("industry") and supplier["industry"].strip().lower() != filters["industry"].strip().lower():
            continue
        if filters.get("location") and supplier["location"].strip().lower() != filters["location"].strip().lower():
            continue
        if filters.get("certifications"):
            certs = set(map(str.strip, filters["certifications"].split(",")))
            if not certs.issubset(set(supplier["certifications"])):
                continue
        if filters.get("price_range"):
            try:
                min_price, max_price = map(float, filters["price_range"].split("-"))
                if not (min_price <= supplier["price"] <= max_price):
                    continue
            except ValueError:
                print("Invalid price range format")
                return []
        if filters.get("quality_rating"):
            if supplier["quality_rating"] < float(filters["quality_rating"]):
                continue

        filtered_suppliers.append(supplier)

    return filtered_suppliers

def rank_suppliers(suppliers, sort_by="quality_rating", order="desc"):
    """
    Ranks suppliers based on quality, price, and reliability.
    """
    valid_sort_keys = {"quality_rating", "price", "reliability_score"}
    
    if sort_by not in valid_sort_keys:
        print(f"Invalid sorting key: {sort_by}. Defaulting to 'quality_rating'.")
        sort_by = "quality_rating"
    
    reverse = order == "desc"
    
    try:
        return sorted(suppliers, key=lambda s: s.get(sort_by, 0), reverse=reverse)
    except Exception as e:
        print(f"Error during sorting: {e}")
        return suppliers
