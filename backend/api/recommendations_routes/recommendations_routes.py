# Handle matchmaking and recommendations using LightFM.
# backend/recommend_routes/recommend_routes.py

from flask import Blueprint, jsonify, request
from backend.match_making.match_making import MatchMaking
from backend.api.db_connection import db
import logging
import random

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

recommendations_bp = Blueprint('recommendations', __name__)

# Initialize MatchMaking instance
match_maker = MatchMaking()

# Precompute dataset and model on startup
def initialize_recommendations():
    with db.get_db().cursor() as cursor:
        cursor.execute("SELECT user_id FROM Users")
        users = cursor.fetchall()
        user_ids = [u[0] for u in users]

        if not user_ids:
            logger.info("No users found. Skipping recommendation initialization.")
            return

        # Generate synthetic interactions using archetype-based logic
        interactions_data = []
        archetypes = ["Saver", "Spender", "Traveler"]
        user_archetypes = {uid: random.choice(archetypes) for uid in user_ids}

        for user_a in user_ids:
            for user_b in user_ids:
                if user_a == user_b:
                    continue
                # Higher probability if same archetype
                if user_archetypes[user_a] == user_archetypes[user_b]:
                    like_prob = 0.7
                else:
                    like_prob = 0.3
                if random.random() < like_prob:
                    interactions_data.append((user_a, user_b))

        # Build the dataset
        match_maker.build_dataset()

        # Build interactions
        match_maker.build_interactions(interactions_data)

        # Build feature matrices
        match_maker.build_features()

        # Train the model
        match_maker.train_model(epochs=30)

# Call the initialization function when the blueprint is registered
initialize_recommendations()

@recommendations_bp.route('/recommend/<int:user_id>', methods=['GET'])
def recommend_matches(user_id):
    """
    Recommend top-k matches for the given user_id.
    Example: GET /recommend_routes/recommend/1?k=5
    """
    try:
        # Validate user_id exists
        cursor = db.get_db().cursor()
        cursor.execute("SELECT COUNT(*) FROM Users WHERE user_id = %s", (user_id,))
        count = cursor.fetchone()[0]
        if count == 0:
            return jsonify({"error": "User not found"}), 404

        # Get 'k' from query params, default to 5
        k = int(request.args.get('k', 5))

        # Generate recommendations
        recommendations = match_maker.recommend(user_id, k=k)

        # Format the response
        response = []
        for matched_user_id, score in recommendations:
            # Fetch user details for matched users
            cursor.execute("""
                SELECT first_name, last_name, profile_picture 
                FROM Users 
                WHERE user_id = %s
            """, (matched_user_id,))
            user_info = cursor.fetchone()
            if user_info:
                response.append({
                    "user_id": matched_user_id,
                    "first_name": user_info[0],
                    "last_name": user_info[1],
                    "profile_picture": user_info[2],
                    "score": round(float(score), 2)
                })

        return jsonify({
            "user_id": user_id,
            "recommendations": response
        }), 200

    except Exception as e:
        logger.error(f"Error in recommend_matches: {e}")
        return jsonify({"error": "Internal server error"}), 500
