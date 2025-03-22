from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

db = SQLAlchemy()

def create_app():
    load_dotenv()  # Load environment variables

    app = Flask(__name__)

    # Load configuration
    app.config.from_object("config.Config")

    # Initialize database
    db.init_app(app)

    # Import and register blueprints (routes)
    from app.routes.suppliers import suppliers_bp
    from app.routes.search import search_bp
    from app.routes.ranking import ranking_bp
    from app.routes.verification import verification_bp

    app.register_blueprint(suppliers_bp, url_prefix="/suppliers")
    app.register_blueprint(search_bp, url_prefix="/search")
    app.register_blueprint(ranking_bp, url_prefix="/ranking")
    app.register_blueprint(verification_bp, url_prefix="/verification")

    return app
