from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Supplier(db.Model):
    __tablename__ = "suppliers"

    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(255), nullable=False, index=True)
    price = db.Column(db.Float, nullable=False)
    website = db.Column(db.String(255), nullable=True)
    country = db.Column(db.String(100), nullable=False, index=True)
    contact_data = db.Column(db.Text, nullable=True)
    manufacturing_capabilities = db.Column(db.Text, nullable=True)
    certifications = db.Column(db.JSON, nullable=True)  # Store as list of strings
    customer_reviews = db.Column(db.Text, nullable=True)
    industries_served = db.Column(db.JSON, nullable=True)  # Store as list of strings
    company_metadata = db.Column(db.JSON, nullable=True)  # Store as JSON object
    annual_revenue = db.Column(db.Float, nullable=True)
    reliability_score = db.Column(db.Float, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "product_name": self.product_name,
            "price": self.price,
            "website": self.website,
            "country": self.country,
            "contact_data": self.contact_data,
            "manufacturing_capabilities": self.manufacturing_capabilities,
            "certifications": self.certifications or [],
            "customer_reviews": self.customer_reviews,
            "industries_served": self.industries_served or [],
            "company_metadata": self.company_metadata or {},
            "annual_revenue": self.annual_revenue,
            "reliability_score": self.reliability_score,
        }
