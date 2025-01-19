from flask import Flask
from api.db_connection import db
from api.recommendations_routes.recommendations_routes import recommendations_bp
from api.transactions_routes.transactions_routes import transactions_bp
from api.users_routes.users_routes import users_bp
import os
from dotenv import load_dotenv

def create_app():
    app = Flask(__name__)

    # Load environment variables
    load_dotenv()

    # Configure DB
    app.config['MYSQL_DATABASE_USER'] = os.getenv('DB_USER').strip()
    app.config['MYSQL_DATABASE_PASSWORD'] = os.getenv('MYSQL_ROOT_PASSWORD').strip()
    app.config['MYSQL_DATABASE_HOST'] = os.getenv('DB_HOST').strip()
    app.config['MYSQL_DATABASE_PORT'] = int(os.getenv('DB_PORT').strip())
    app.config['MYSQL_DATABASE_DB'] = os.getenv('DB_NAME').strip()

    # Secret key
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.logger.info('current_app(): starting the database connection')

    # Initialize the database
    db.init_app(app)
    app.logger.info('current_app(): registering blueprints with Flask app object.')   


    # Register blueprints
    app.register_blueprint(users_bp)
    app.register_blueprint(transactions_bp)
    app.register_blueprint(recommendations_bp)

    return app