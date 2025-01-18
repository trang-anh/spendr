import ofxparse


def read_qfx(file_path):
    """
    Read and parse a .qfx file, extracting account and transaction information.

    Parameters:
    - file_path (str): Path to the .qfx file.

    Returns:
    - dict: A dictionary containing account and transaction details.
    """
    with open(file_path, 'r') as file:
        # Parse the QFX file
        ofx = ofxparse.OfxParser.parse(file)

    # Extract account details
    account = ofx.account
    account_info = {
        "account_id": account.account_id,
    }

    # Extract transactions
    transactions = []
    for transaction in account.statement.transactions:
        transactions.append({
            "date": transaction.date,
            "amount": transaction.amount,
            "description": transaction.memo,
            "payee": transaction.payee,
        })

    return {"account_info": account_info, "transactions": transactions}


# Example usage
if __name__ == "__main__":
    file_path = "stmt.qfx"  # Replace with your .qfx file path

    try:
        qfx_data = read_qfx(file_path)

        print("Account Information:")
        print(qfx_data["account_info"])

        print("\nTransactions:")
        for txn in qfx_data["transactions"]:
            print(
                f"Date: {txn['date']}, Amount: {txn['amount']}, Description: {txn['description']}, Payee: {txn['payee']}")
    except Exception as e:
        print(f"Error reading .qfx file: {e}")
