# Handle user registration, login, profile management.
from flask import Blueprint, request, jsonify
from backend.db_connection import db
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

users_bp = Blueprint('users', __name__)

@users_bp.route('/register', methods=['POST'])
def register_user():
    """
    Register a new user.
    Expected JSON payload:
    {
        "first_name": "John",
        "last_name": "Doe",
        "gender": "male",
        "location": "CityA",
        "sexuality": "heterosexual",
        "biography": "Love traveling and good food.",
        "profile_picture": "url_to_picture",
        "user_type": "regular"  # or "premium"
    }
    """
    try:
        data = request.json
        required_fields = ["first_name", "last_name", "gender", "location", "sexuality", "biography", "profile_picture", "user_type"]
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        # Insert user into the database
        cursor = db.get_db().cursor()
        insert_query = """
            INSERT INTO Users (first_name, last_name, gender, location, sexuality, biography, profile_picture, is_active, user_type)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (
            data["first_name"],
            data["last_name"],
            data["gender"],
            data["location"],
            data["sexuality"],
            data["biography"],
            data["profile_picture"],
            True,  # is_active
            data["user_type"]
        ))
        db.get_db().commit()

        user_id = cursor.lastrowid

        return jsonify({"message": "User registered successfully", "user_id": user_id}), 201

    except Exception as e:
        logger.error(f"Error in register_user: {e}")
        return jsonify({"error": "Internal server error"}), 500

@users_bp.route('/login', methods=['POST'])
def login_user():
    """
    User login.
    Expected JSON payload:
    {
        "user_id": 1
    }
    """
    try:
        data = request.json
        user_id = data.get("user_id")
        if not user_id:
            return jsonify({"error": "User ID is required"}), 400

        # Check if user exists and is active
        cursor = db.get_db().cursor()
        cursor.execute("SELECT is_active FROM Users WHERE user_id = %s", (user_id,))
        result = cursor.fetchone()
        if not result:
            return jsonify({"error": "User not found"}), 404
        if not result[0]:
            return jsonify({"error": "User is inactive"}), 403

        return jsonify({"message": "Login successful", "user_id": user_id}), 200

    except Exception as e:
        logger.error(f"Error in login_user: {e}")
        return jsonify({"error": "Internal server error"}), 500

@users_bp.route('/profile/<int:user_id>', methods=['GET'])
def get_user_profile(user_id):
    """
    Get user profile details.
    """
    try:
        cursor = db.get_db().cursor()
        cursor.execute("""
            SELECT first_name, last_name, gender, location, sexuality, biography, profile_picture, user_type
            FROM Users
            WHERE user_id = %s
        """, (user_id,))
        user = cursor.fetchone()
        if not user:
            return jsonify({"error": "User not found"}), 404

        profile = {
            "user_id": user_id,
            "first_name": user[0],
            "last_name": user[1],
            "gender": user[2],
            "location": user[3],
            "sexuality": user[4],
            "biography": user[5],
            "profile_picture": user[6],
            "user_type": user[7]
        }

        return jsonify({"profile": profile}), 200

    except Exception as e:
        logger.error(f"Error in get_user_profile: {e}")
        return jsonify({"error": "Internal server error"}), 500
