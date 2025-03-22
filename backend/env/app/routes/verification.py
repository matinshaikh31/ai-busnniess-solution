from flask import Blueprint, request, jsonify
import json
import os
from app.services.supplier_verification import verify_supplier

verification_bp = Blueprint("verification", __name__)

SUPPLIERS_FILE = "data/suppliers.json"
VERIFIED_SUPPLIERS_FILE = "data/suppliers_verified.json"

# Load suppliers
def load_suppliers():
    if os.path.exists(SUPPLIERS_FILE):
        with open(SUPPLIERS_FILE, "r") as file:
            return json.load(file)
    return []

# Save verified suppliers
def save_verified_suppliers(suppliers):
    with open(VERIFIED_SUPPLIERS_FILE, "w") as file:
        json.dump(suppliers, file, indent=4)

@verification_bp.route("/verify", methods=["POST"])
def verify_suppliers():
    """
    Verify and filter valid suppliers.
    """
    suppliers = load_suppliers()
    if not suppliers:
        return jsonify({"message": "No suppliers available for verification."}), 400

    verified_suppliers = [supplier for supplier in suppliers if verify_supplier(supplier)]
    
    save_verified_suppliers(verified_suppliers)

    return jsonify({
        "message": "Supplier verification completed.",
        "verified_count": len(verified_suppliers),
        "verified_suppliers": verified_suppliers
    })
