from flask import Blueprint, request, jsonify
from app.models.supplier_model import Supplier
from app import db

suppliers_bp = Blueprint("suppliers", __name__)

# ✅ Get all suppliers
@suppliers_bp.route("/suppliers", methods=["GET"])
def get_suppliers():
    suppliers = Supplier.query.all()
    return jsonify([supplier.to_dict() for supplier in suppliers])

# ✅ Get supplier by ID
@suppliers_bp.route("/suppliers/<int:supplier_id>", methods=["GET"])
def get_supplier(supplier_id):
    supplier = Supplier.query.get(supplier_id)
    if not supplier:
        return jsonify({"error": "Supplier not found"}), 404
    return jsonify(supplier.to_dict())

# ✅ Add a new supplier
@suppliers_bp.route("/suppliers", methods=["POST"])
def add_supplier():
    data = request.json
    new_supplier = Supplier(
        name=data["name"],
        website=data["website"],
        country=data["country"],
        contact_data=data["contact_data"],
        manufacturing_capabilities=data["manufacturing_capabilities"],
        certifications=",".join(data["certifications"]),
        customer_reviews=data["customer_reviews"],
        industries_served=",".join(data["industries_served"]),
        company_metadata=data["company_metadata"],
        annual_revenue=data["annual_revenue"],
        reliability_score=data["reliability_score"],
        product_name=data["product_name"],
        price=data["price"]
    )
    db.session.add(new_supplier)
    db.session.commit()
    return jsonify(new_supplier.to_dict()), 201

# ✅ Update supplier by ID
@suppliers_bp.route("/suppliers/<int:supplier_id>", methods=["PUT"])
def update_supplier(supplier_id):
    supplier = Supplier.query.get(supplier_id)
    if not supplier:
        return jsonify({"error": "Supplier not found"}), 404

    data = request.json
    supplier.name = data.get("name", supplier.name)
    supplier.website = data.get("website", supplier.website)
    supplier.country = data.get("country", supplier.country)
    supplier.contact_data = data.get("contact_data", supplier.contact_data)
    supplier.manufacturing_capabilities = data.get("manufacturing_capabilities", supplier.manufacturing_capabilities)
    supplier.certifications = ",".join(data.get("certifications", supplier.certifications.split(",")))
    supplier.customer_reviews = data.get("customer_reviews", supplier.customer_reviews)
    supplier.industries_served = ",".join(data.get("industries_served", supplier.industries_served.split(",")))
    supplier.company_metadata = data.get("company_metadata", supplier.company_metadata)
    supplier.annual_revenue = data.get("annual_revenue", supplier.annual_revenue)
    supplier.reliability_score = data.get("reliability_score", supplier.reliability_score)
    supplier.product_name = data.get("product_name", supplier.product_name)
    supplier.price = data.get("price", supplier.price)

    db.session.commit()
    return jsonify(supplier.to_dict())

# ✅ Delete supplier by ID
@suppliers_bp.route("/suppliers/<int:supplier_id>", methods=["DELETE"])
def delete_supplier(supplier_id):
    supplier = Supplier.query.get(supplier_id)
    if not supplier:
        return jsonify({"error": "Supplier not found"}), 404

    db.session.delete(supplier)
    db.session.commit()
    return jsonify({"message": "Supplier deleted"}), 200
