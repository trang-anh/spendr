import numpy as np
from lightfm import LightFM
from lightfm.data import Dataset
from backend.db_connection import db
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MatchMaking:
    def __init__(self):
        self.model = LightFM(loss='warp')  # 'warp' works well for implicit feedback
        self.dataset = Dataset()
        self.user_ids = []
        self.item_ids = []
        self.user_features = []
        self.item_features = []
        self.interactions = None
        self.weights = None
        self.fit_done = False

    def get_user_feature_list(self, uid):
        """
        Fetch user features from the database and format them for LightFM.
        """
        cursor = db.get_db().cursor()

        # Fetch financial data
        spending_query = """
            SELECT c.category_name, SUM(t.amount) AS total_spent
            FROM Transactions t
            JOIN Vendors v ON t.vendor_id = v.vendor_id
            JOIN Category c ON v.category_id = c.category_id
            WHERE t.user_id = %s
            GROUP BY c.category_name;
        """
        cursor.execute(spending_query, (uid,))
        spending_data = cursor.fetchall()  # Example: [("Food", 200), ("Travel", 100)]

        features = []
        for category, total in spending_data:
            # Bucketize spending into low, medium, high
            if total > 200:
                bucket = "high"
            elif total > 100:
                bucket = "medium"
            else:
                bucket = "low"
            features.append(f"{category.lower()}_{bucket}")

        # Fetch survey responses
        survey_query = "SELECT * FROM SurveyResponses WHERE user_id = %s"
        cursor.execute(survey_query, (uid,))
        survey_responses = cursor.fetchone()  # Example: (user_id, Q1, Q2, ..., Q10)

        if survey_responses:
            for i, score in enumerate(survey_responses[1:], start=1):
                features.append(f"surveyQ{i}_{score}")

        # Fetch demographic info (e.g., location)
        user_query = "SELECT location FROM Users WHERE user_id = %s"
        cursor.execute(user_query, (uid,))
        user_info = cursor.fetchone()
        if user_info:
            location = user_info[0].replace(" ", "_").lower()
            features.append(f"location_{location}")

        # Add more features as needed (e.g., risk tolerance)
        # Example: features.append("risk_medium")

        return features

    def build_dataset(self):
        """
        Initialize the LightFM Dataset with users, items, and their features.
        """
        logger.info("Building LightFM dataset...")

        # Fetch all user IDs
        cursor = db.get_db().cursor()
        cursor.execute("SELECT user_id FROM Users")
        users = cursor.fetchall()
        self.user_ids = [u[0] for u in users]
        self.item_ids = self.user_ids.copy()  # In dating apps, users are both users and items

        # Gather all unique feature tokens
        all_feature_tokens = set()
        for uid in self.user_ids:
            feats = self.get_user_feature_list(uid)
            for token in feats:
                all_feature_tokens.add(token)
        all_feature_tokens = list(all_feature_tokens)

        # Fit the dataset
        self.dataset.fit(
            users=self.user_ids,
            items=self.item_ids,
            user_features=all_feature_tokens,
            item_features=all_feature_tokens
        )

    def build_interactions(self, interactions_data):
        """
        Build the interactions matrix from user-item interactions.
        """
        logger.info("Building interactions matrix...")
        self.interactions, self.weights = self.dataset.build_interactions(
            [(u, i) for u, i in interactions_data]
        )

    def build_features(self):
        """
        Build user and item feature matrices.
        """
        logger.info("Building feature matrices...")

        self.user_features = self.dataset.build_user_features(
            [(uid, self.get_user_feature_list(uid)) for uid in self.user_ids]
        )

        self.item_features = self.dataset.build_item_features(
            [(iid, self.get_user_feature_list(iid)) for iid in self.item_ids]
        )

    def train_model(self, epochs=30):
        """
        Train the LightFM model.
        """
        if not self.fit_done:
            logger.info("Training LightFM model...")
            self.model.fit(
                self.interactions,
                sample_weight=self.weights,
                user_features=self.user_features,
                item_features=self.item_features,
                epochs=epochs,
                num_threads=2
            )
            self.fit_done = True
            logger.info("Model training completed.")

    def recommend(self, user_id, k=5):
        """
        Recommend top-k items (users) for a given user_id.
        """
        logger.info(f"Generating recommendations for user_id: {user_id}")

        try:
            user_internal_id = self.dataset.mapping()[0][user_id]
        except KeyError:
            logger.error(f"User ID {user_id} not found in dataset mappings.")
            return []

        item_internal_ids = np.arange(len(self.item_ids))

        scores = self.model.predict(
            user_internal_id,
            item_internal_ids,
            user_features=self.user_features,
            item_features=self.item_features
        )

        # Get top-k scores and corresponding item IDs
        top_indices = np.argsort(-scores)[:k+10]  # Fetch extra in case of filtering
        recommended_ids = []
        for idx in top_indices:
            recommended_user_id = self.item_ids[idx]
            if recommended_user_id != user_id:
                recommended_ids.append((recommended_user_id, scores[idx]))
            if len(recommended_ids) >= k:
                break

        return recommended_ids
