from flask import Blueprint, request, jsonify
from backend.api.db_connection import db
import csv
import io
import logging
from backend.qfx_reader.qfx_parser import read_qfx

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

transactions_bp = Blueprint('transactions', __name__)

@transactions_bp.route('/upload_csv', methods=['POST'])
def upload_csv():
    """
    Upload a CSV file containing transactions.
    Expected form-data:
    - user_id: int
    - file: CSV file
    """
    try:
        user_id = request.form.get('user_id')
        file = request.files.get('file')

        if not user_id or not file:
            return jsonify({"error": "user_id and CSV file are required"}), 400

        # Convert file to a readable stream
        stream = io.StringIO(file.stream.read().decode('utf-8'))
        csv_reader = csv.DictReader(stream)

        # Summation dictionary: { "Food": total_amount, "Travel": total_amount, ... }
        category_sums = {}

        cursor = db.get_db().cursor()

        for row in csv_reader:
            category = row.get('Category', 'Unknown')
            amount_str = row.get('Amount', '0')

            try:
                amount = float(amount_str)
            except ValueError:
                amount = 0.0

            category_sums[category] = category_sums.get(category, 0.0) + amount

            # Insert into Vendors table if not exists
            vendor_name = row.get('Vendor_Name', 'Unknown')
            cursor.execute("SELECT vendor_id FROM Vendors WHERE vendor_name = %s", (vendor_name,))
            vendor = cursor.fetchone()
            if vendor:
                vendor_id = vendor[0]
            else:
                # Insert new vendor
                cursor.execute("""
                    INSERT INTO Vendors (vendor_name, category_id) 
                    VALUES (%s, (SELECT category_id FROM Category WHERE category_name = %s))
                """, (vendor_name, category))
                vendor_id = cursor.lastrowid
                db.get_db().commit()

            # Insert transaction
            cursor.execute("""
                INSERT INTO Transactions (user_id, vendor_id, amount) 
                VALUES (%s, %s, %s)
            """, (user_id, vendor_id, amount))
            db.get_db().commit()

        return jsonify({
            "message": "CSV processed successfully",
            "category_sums": category_sums
        }), 200

    except Exception as e:
        logger.error(f"Error in upload_csv: {e}")
        return jsonify({"error": "Failed to process CSV"}), 500

@transactions_bp.route('/upload_qfx', methods=['POST'])
def upload_qfx():
    """
    Upload a QFX file containing transactions.
    Expected form-data:
    - user_id: int
    - file: QFX file
    """
    try:
        user_id = request.form.get('user_id')
        file = request.files.get('file')

        if not user_id or not file:
            return jsonify({"error": "user_id and QFX file are required"}), 400

        # Read file content
        file_content = file.read().decode('utf-8')

        # Parse QFX transactions
        qfx_data = read_qfx(file_content)

        if not qfx_data.get('transactions'):
            return jsonify({"error": "No transactions found or failed to parse QFX file"}), 400

        transactions = qfx_data['transactions']
        category_sums = {}

        cursor = db.get_db().cursor()

        for txn in transactions:
            category = categorize_transaction(txn.get('payee', 'Other'))
            amount = abs(txn.get('amount', 0.0))  # Ensure positive amounts

            # Update category sums
            category_sums[category] = category_sums.get(category, 0.0) + amount

            # Insert into Vendors table if not exists
            vendor_name = txn.get('payee', 'Unknown')
            cursor.execute("SELECT vendor_id FROM Vendors WHERE vendor_name = %s", (vendor_name,))
            vendor = cursor.fetchone()
            if vendor:
                vendor_id = vendor[0]
            else:
                # Insert new vendor
                cursor.execute("""
                    INSERT INTO Vendors (vendor_name, category_id) 
                    VALUES (%s, (SELECT category_id FROM Category WHERE category_name = %s))
                """, (vendor_name, category))
                vendor_id = cursor.lastrowid
                db.get_db().commit()

            # Insert transaction
            cursor.execute("""
                INSERT INTO Transactions (user_id, vendor_id, amount) 
                VALUES (%s, %s, %s)
            """, (user_id, vendor_id, amount))
            db.get_db().commit()

        return jsonify({
            "message": "QFX processed successfully",
            "category_sums": category_sums
        }), 200

    except Exception as e:
        logger.error(f"Error in upload_qfx: {e}")
        return jsonify({"error": "Failed to process QFX"}), 500

@transactions_bp.route('/categories/<int:user_id>', methods=['GET'])
def get_category_summaries(user_id):
    """
    Get category summaries for a user.
    """
    try:
        cursor = db.get_db().cursor()
        query = """
            SELECT c.category_name, SUM(t.amount) AS total_spent
            FROM Transactions t
            JOIN Vendors v ON t.vendor_id = v.vendor_id
            JOIN Category c ON v.category_id = c.category_id
            WHERE t.user_id = %s
            GROUP BY c.category_name
            ORDER BY total_spent DESC
        """
        cursor.execute(query, (user_id,))
        rows = cursor.fetchall()

        category_list = []
        for row in rows:
            category_list.append({
                "category": row[0],
                "total_amount": float(row[1])
            })

        return jsonify({
            "user_id": user_id,
            "categories_ranked": category_list
        }), 200

    except Exception as e:
        logger.error(f"Error in get_category_summaries: {e}")
        return jsonify({"error": "Internal server error"}), 500

def categorize_transaction(payee):
    """
    Categorize transactions based on payee name.
    Expand this function to include more sophisticated categorization logic.

    Args:
        payee (str): Name of the payee.

    Returns:
        str: Category name.
    """
    payee_lower = payee.lower()
    if "starbucks" in payee_lower or "mcdonald's" in payee_lower:
        return "Food"
    elif "uber" in payee_lower or "lyft" in payee_lower:
        return "Travel"
    elif "amazon" in payee_lower or "ebay" in payee_lower:
        return "Shopping"
    elif "netflix" in payee_lower or "spotify" in payee_lower:
        return "Entertainment"
    elif "electricity" in payee_lower or "water" in payee_lower:
        return "Utilities"
    else:
        return "Other"
