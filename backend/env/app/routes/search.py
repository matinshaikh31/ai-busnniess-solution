from flask import Blueprint, request, jsonify
from app.services.search_ranking import search_suppliers, rank_suppliers

search_bp = Blueprint("search", __name__)

@search_bp.route("/", methods=["GET"])
def search():
    """
    Endpoint to search for suppliers based on filters.
    """
    filters = {
        "product_name": request.args.get("product_name"),
        "price_min": request.args.get("price_min"),
        "price_max": request.args.get("price_max"),
        "country": request.args.get("country"),
        "manufacturing_capabilities": request.args.get("manufacturing_capabilities"),
        "certifications": request.args.get("certifications"),
        "industries_served": request.args.get("industries_served"),
        "reliability_score": request.args.get("reliability_score"),
    }

    # Filter suppliers
    filtered_suppliers = search_suppliers(filters)

    return jsonify({"filtered_suppliers": filtered_suppliers})


@search_bp.route("/rank", methods=["GET"])
def rank():
    """
    Endpoint to rank suppliers based on quality, price, and reliability.
    """
    filters = {
        "product_name": request.args.get("product_name"),
        "price_min": request.args.get("price_min"),
        "price_max": request.args.get("price_max"),
        "country": request.args.get("country"),
        "manufacturing_capabilities": request.args.get("manufacturing_capabilities"),
        "certifications": request.args.get("certifications"),
        "industries_served": request.args.get("industries_served"),
        "reliability_score": request.args.get("reliability_score"),
    }

    # Filter suppliers
    filtered_suppliers = search_suppliers(filters)

    # Get sorting preference
    sort_by = request.args.get("sort_by", "reliability_score")  # Default: reliability_score
    order = request.args.get("order", "desc")  # Default: descending

    # Rank suppliers
    ranked_suppliers = rank_suppliers(filtered_suppliers, sort_by=sort_by, order=order)

    return jsonify({"ranked_suppliers": ranked_suppliers})
