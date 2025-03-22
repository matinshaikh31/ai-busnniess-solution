def calculate_rank(supplier):
    """
    Calculate supplier ranking based on multiple factors:
    - Price (lower is better)
    - Quality (higher is better)
    - Reliability Score (higher is better)
    """
    price_weight = 0.4
    quality_weight = 0.3
    reliability_weight = 0.3

    # Extract values with defaults
    price = supplier.get("price", 1000)  # Assume high price if missing
    quality = supplier.get("quality_score", 0)
    reliability = supplier.get("reliability_score", 0)

    # Normalize and calculate rank score (higher is better)
    rank_score = (
        (1 / price) * price_weight + 
        (quality / 10) * quality_weight + 
        (reliability / 10) * reliability_weight
    )

    return rank_score
