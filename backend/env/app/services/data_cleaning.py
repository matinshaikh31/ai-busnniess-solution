import json
import re
import os
from flask_sqlalchemy import SQLAlchemy
from app.models import db, Supplier  # Import the db and Supplier model

# Load environment variables if needed
from dotenv import load_dotenv
load_dotenv()

DATA_FILE = os.getenv("DATA_FILE", "data/suppliers.json")


def load_suppliers():
    """Load supplier data from the JSON file."""
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def clean_text(text):
    """Standardize text by removing extra spaces, special characters, and converting to lowercase."""
    return re.sub(r'\s+', ' ', text.strip()).lower()


def clean_data(suppliers):
    """Perform data cleaning and standardization."""
    for supplier in suppliers:
        supplier["product_name"] = clean_text(supplier.get("name", ""))
        supplier["price"] = float(supplier.get("price", 0))  # Ensure price is a float
        supplier["website"] = supplier.get("website", "").strip()
        supplier["country"] = clean_text(supplier.get("location", ""))
        supplier["contact_data"] = supplier.get("contact", "").strip()
        supplier["manufacturing_capabilities"] = supplier.get("manufacturing_capabilities", "").strip()
        supplier["certifications"] = supplier.get("certifications", "")
        supplier["customer_reviews"] = supplier.get("customer_reviews", "")
        supplier["industries_served"] = supplier.get("industries_served", "")
        supplier["company_metadata"] = supplier.get("company_metadata", {})
        supplier["annual_revenue"] = float(supplier.get("annual_revenue", 0))  # Ensure annual revenue is a float
        supplier["reliability_score"] = float(supplier.get("reliability_score", 0))  # Ensure reliability score is a float
    return suppliers


def save_cleaned_data(suppliers):
    """Save cleaned supplier data to the database."""
    for supplier in suppliers:
        # Check if the supplier already exists by matching a unique field (e.g., product_name or website)
        existing_supplier = Supplier.query.filter_by(product_name=supplier["product_name"]).first()

        if existing_supplier:
            # Update the existing supplier with new data
            existing_supplier.price = supplier["price"]
            existing_supplier.website = supplier["website"]
            existing_supplier.country = supplier["country"]
            existing_supplier.contact_data = supplier["contact_data"]
            existing_supplier.manufacturing_capabilities = supplier["manufacturing_capabilities"]
            existing_supplier.certifications = ",".join(supplier["certifications"])  # Store as comma-separated
            existing_supplier.customer_reviews = supplier["customer_reviews"]
            existing_supplier.industries_served = ",".join(supplier["industries_served"])  # Store as comma-separated
            existing_supplier.company_metadata = supplier["company_metadata"]
            existing_supplier.annual_revenue = supplier["annual_revenue"]
            existing_supplier.reliability_score = supplier["reliability_score"]
        else:
            # Create a new supplier record
            new_supplier = Supplier(
                product_name=supplier["product_name"],
                price=supplier["price"],
                website=supplier["website"],
                country=supplier["country"],
                contact_data=supplier["contact_data"],
                manufacturing_capabilities=supplier["manufacturing_capabilities"],
                certifications=",".join(supplier["certifications"]),  # Store as comma-separated
                customer_reviews=supplier["customer_reviews"],
                industries_served=",".join(supplier["industries_served"]),  # Store as comma-separated
                company_metadata=supplier["company_metadata"],
                annual_revenue=supplier["annual_revenue"],
                reliability_score=supplier["reliability_score"],
            )
            db.session.add(new_supplier)

    # Commit all changes to the database
    db.session.commit()


def process_data_cleaning():
    """Main function to clean supplier data and store in the database."""
    suppliers = load_suppliers()
    cleaned_suppliers = clean_data(suppliers)
    save_cleaned_data(cleaned_suppliers)
    return cleaned_suppliers
