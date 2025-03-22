from flask import Blueprint, request, jsonify
from app.utils.helpers import calculate_rank

ranking_bp = Blueprint("ranking", __name__)

# Simulating supplier storage (Using in-memory list for now)
suppliers_data = []

@ranking_bp.route("/rank", methods=["GET"])
def rank_suppliers():
    """
    Rank suppliers based on price, quality, and reliability.
    """
    if not suppliers_data:
        return jsonify({"error": "No suppliers data available"}), 400

    # Calculate ranking scores for each supplier
    ranked_suppliers = sorted(suppliers_data, key=lambda s: calculate_rank(s), reverse=True)

    return jsonify({"ranked_suppliers": ranked_suppliers, "count": len(ranked_suppliers)})
