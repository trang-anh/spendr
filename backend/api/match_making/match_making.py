import numpy as np
from lightfm import LightFM
from lightfm.data import Dataset
from backend.api.db_connection import db
import logging
import spacy
from textblob import TextBlob

# Initialize spaCy's English model for NLP tasks
nlp = spacy.load('en_core_web_sm')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def extract_valid_interests(biography, valid_keywords):
    """
    Extract validated interests from a user's biography using NLP techniques.
    Only includes interests that are present in the valid_keywords list and
    are mentioned positively.
    """
    doc = nlp(biography)
    extracted_interests = []
    
    # Extract entities and perform sentiment analysis
    for ent in doc.ents:
        interest = ent.text.lower()
        if interest in valid_keywords:
            # Check sentiment of the sentence containing the interest
            sentence = ent.sent.text
            blob = TextBlob(sentence)
            if blob.sentiment.polarity > 0:
                extracted_interests.append(f"interest_{interest}")
    
    return extracted_interests

class MatchMaking:
    def __init__(self):
        self.model = LightFM(loss='warp')  # 'warp' is effective for implicit feedback
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
        cursor = db.get_db().cursor(dictionary=True)

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
        spending_data = cursor.fetchall()

        features = []
        for entry in spending_data:
            category = entry['category_name'].lower()
            total = entry['total_spent']
            # Normalize spending (cap at $500)
            normalized_spent = min(total / 500.0, 1.0)
            features.append(f"spend_{category}_{normalized_spent:.2f}")

        # Fetch survey responses
        survey_query = "SELECT * FROM SurveyResponses WHERE user_id = %s"
        cursor.execute(survey_query, (uid,))
        survey_responses = cursor.fetchone()

        if survey_responses:
            for i in range(1, 11):
                score = survey_responses.get(f'question_{i}', '3')  # Default to '3' if missing
                features.append(f"surveyQ{i}_{score}")

        # Fetch demographic info
        user_query = "SELECT gender, sexuality, location, user_type, biography FROM Users WHERE user_id = %s"
        cursor.execute(user_query, (uid,))
        user_info = cursor.fetchone()
        if user_info:
            gender = user_info['gender'].lower()
            sexuality = user_info['sexuality'].lower()
            location = user_info['location'].replace(" ", "_").lower()
            user_type = user_info['user_type'].replace(" ", "_").lower()

            features.append(f"gender_{gender}")
            features.append(f"sexuality_{sexuality}")
            features.append(f"location_{location}")
            features.append(f"user_type_{user_type}")

            # Enhanced Interests Extraction using NLP
            biography = user_info.get('biography', '').lower()
            valid_keywords = ['traveling', 'photography', 'fitness', 'gamer', 'artist', 'foodie', 'reader', 'yogi', 'musician', 'developer']
            extracted_interests = extract_valid_interests(biography, valid_keywords)
            features.extend(extracted_interests)

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
        self.item_ids = self.user_ids.copy()  # Users are both users and items

        # Gather all unique feature tokens
        all_feature_tokens = set()
        for uid in self.user_ids:
            feats = self.get_user_feature_list(uid)
            for token in feats:
                all_feature_tokens.add(token)
        all_feature_tokens = sorted(list(all_feature_tokens))  # Sorting for consistency

        logger.info(f"Total unique features: {len(all_feature_tokens)}")

        # Fit the dataset with users, items, and their features
        self.dataset.fit(
            users=self.user_ids,
            items=self.item_ids,
            user_features=all_feature_tokens,
            item_features=all_feature_tokens
        )

    def build_interactions_matrix(self, interactions_data):
        """
        Build the interactions matrix from user-item interactions with mutual matches weighted higher.
        """
        logger.info(f"Total interactions to build: {len(interactions_data)}")

        # Create a set for quick lookup of mutual matches
        mutual_matches = set()
        cursor = db.get_db().cursor(dictionary=True)
        mutual_query = """
            SELECT s1.swiper_id, s1.swiped_id
            FROM Swipes s1
            JOIN Swipes s2 ON s1.swiper_id = s2.swiped_id AND s1.swiped_id = s2.swiper_id
            WHERE s1.swipe_type = 'right' AND s2.swipe_type = 'right';
        """
        cursor.execute(mutual_query)
        mutual = cursor.fetchall()
        for pair in mutual:
            mutual_matches.add((pair['swiper_id'], pair['swiped_id']))

        # Assign higher weights to mutual matches
        interactions_with_weights = []
        for interaction in interactions_data:
            if interaction in mutual_matches:
                weight = 2.0  # Arbitrary higher weight for mutual matches
            else:
                weight = 1.0
            interactions_with_weights.append((interaction, weight))

        # Build interactions and weights
        if interactions_with_weights:
            user_item_pairs, weights = zip(*interactions_with_weights)
        else:
            user_item_pairs, weights = ([], [])

        self.interactions, self.weights = self.dataset.build_interactions(user_item_pairs, weights=weights)


    def build_interactions(self):
        """
        Build the interactions matrix based on actual swipes from the Swipes table.
        """
        logger.info("Building interactions matrix based on actual swipes...")

        cursor = db.get_db().cursor(dictionary=True)
        
        # Fetch all right swipes
        right_swipes_query = """
            SELECT swiper_id, swiped_id
            FROM Swipes
            WHERE swipe_type = 'right';
        """
        cursor.execute(right_swipes_query)
        right_swipes = cursor.fetchall()

        interactions_data = [(swipe['swiper_id'], swipe['swiped_id']) for swipe in right_swipes]

        self.build_interactions_matrix(interactions_data)

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

    def train_model(self, epochs=30, num_threads=4):
        """
        Train the LightFM model with the given number of epochs and threads.
        """
        if not self.fit_done:
            logger.info("Training LightFM model...")
            self.model.fit(
                self.interactions,
                sample_weight=self.weights,
                user_features=self.user_features,
                item_features=self.item_features,
                epochs=epochs,
                num_threads=num_threads,
                verbose=True
            )
            self.fit_done = True
            logger.info("Model training completed.")

    def recommend(self, user_id, k=5):
        """
        Recommend top-k items (users) for a given user_id, excluding self and already interacted users.
        """
        logger.info(f"Generating recommendations for user_id: {user_id}")

        try:
            user_internal_id = self.dataset.mapping()[0][user_id]
        except KeyError:
            logger.error(f"User ID {user_id} not found in dataset mappings.")
            return []

        # Predict scores for all items
        scores = self.model.predict(
            user_internal_id,
            np.arange(len(self.item_ids)),
            user_features=self.user_features,
            item_features=self.item_features
        )

        # Exclude self
        scores[user_internal_id] = -np.inf

        # Exclude already swiped right users
        interacted_items_query = """
            SELECT swiped_id FROM Swipes
            WHERE swiper_id = %s AND swipe_type = 'right';
        """
        cursor = db.get_db().cursor()
        cursor.execute(interacted_items_query, (user_id,))
        interacted_items = [row[0] for row in cursor.fetchall()]
        interacted_internal_ids = [self.dataset.mapping()[1][iid] for iid in interacted_items if iid in self.dataset.mapping()[1]]
        scores[interacted_internal_ids] = -np.inf

        # Get top-k scores and corresponding item IDs
        top_indices = np.argpartition(-scores, k)[:k]
        top_indices_sorted = top_indices[np.argsort(-scores[top_indices])]

        recommended_ids = [self.item_ids[idx] for idx in top_indices_sorted]
        return recommended_ids

    def evaluate_model(self):
        """
        Evaluate the LightFM model using Precision@k and AUC.
        """
        from lightfm.evaluation import precision_at_k, auc_score

        logger.info("Evaluating LightFM model...")
        precision = precision_at_k(self.model, self.interactions, k=5, user_features=self.user_features, item_features=self.item_features).mean()
        auc = auc_score(self.model, self.interactions, user_features=self.user_features, item_features=self.item_features).mean()
        logger.info(f"Precision@5: {precision:.4f}")
        logger.info(f"AUC Score: {auc:.4f}")

    def run(self):
        """
        Execute the matchmaking pipeline: build dataset, interactions, features, train model, evaluate.
        """
        self.build_dataset()
        self.build_interactions()
        self.build_features()
        self.train_model()
        self.evaluate_model()

# Example usage:
if __name__ == "__main__":
    matcher = MatchMaking()
    matcher.run()

    # Generate recommendations for a specific user
    user_to_recommend = 1  # Replace with desired user_id
    recommendations = matcher.recommend(user_to_recommend, k=5)
    logger.info(f"Top 5 recommendations for user {user_to_recommend}: {recommendations}")
