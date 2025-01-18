from flask import Flask
from backend.db_connection import db
from match_making_routes.match_making_routes import match_making_bp
from recommend_routes.recommend_routes import recommendations_bp
from transaction_routes.transactions_routes import transactions_bp
from users_routes.users_routes import users_bp
import os
from dotenv import load_dotenv

def create_app():
    app = Flask(__name__)

    # Load environment variables
    load_dotenv()

    # Configure DB
    app.config['MYSQL_USER'] = os.getenv('DB_USER').strip()
    app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_ROOT_PASSWORD').strip()
    app.config['MYSQL_HOST'] = os.getenv('DB_HOST').strip()
    app.config['MYSQL_PORT'] = int(os.getenv('DB_PORT').strip())
    app.config['MYSQL_DB'] = os.getenv('DB_NAME').strip()

    # Secret key
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

    # Initialize the database
    db.init_app(app)

    # Register blueprints
    app.register_blueprint(users_bp, url_prefix='/users')
    app.register_blueprint(transactions_bp, url_prefix='/transactions')
    app.register_blueprint(recommendations_bp, url_prefix='/recommendations')
    app.register_blueprint(match_making_bp, url_prefix='/matchmaking')  # If applicable

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
