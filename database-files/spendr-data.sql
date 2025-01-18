USE spendr;

INSERT INTO Category (category_name, emoji_column)
VALUES
    ('Groceries', '🛒'),
    ('Dining', '🍽️'),
    ('Entertainment', '🎬'),
    ('Transportation', '🚗');

INSERT INTO Vendors (vendor_name, category_id)
VALUES
    ('Walmart', 1),
    ('McDonalds', 2),
    ('Netflix', 3),
    ('Uber', 4);

INSERT INTO Users (gmail, phone, password, first_name, last_name, gender, location, sexuality, left_swipes, right_swipes, biography, profile_picture, user_type)
VALUES
    ('john.doe@example.com', '1234567890', 'securepassword', 'John', 'Doe', 'Male', 'New York', 'Straight', 5, 15, 'Love traveling and photography.', 'profile1.jpg', 'Yolo Spendr'),
    ('jane.smith@example.com', '9876543210', 'mypassword', 'Jane', 'Smith', 'Female', 'San Francisco', 'Bisexual', 3, 10, 'Foodie and adventurer.', 'profile2.jpg', 'Balanced Budgeter'),
    ('bob.miller@example.com', '4567891230', 'strongpassword', 'Bob', 'Miller', 'Male', 'Chicago', 'Gay', 8, 20, 'Tech enthusiast and gamer.', 'profile3.jpg', 'Investor'),
    ('alice.jones@example.com', '7891234560', 'password123', 'Alice', 'Jones', 'Female', 'Boston', 'Straight', 4, 12, 'Fitness fanatic and book lover.', 'profile4.jpg', 'Deal Hunter');

INSERT INTO Transactions (user_id, amount)
VALUES
    (1, 50.25),
    (2, 20.75),
    (3, 120.00),
    (4, 45.30);

INSERT INTO SurveyResponses (user_id, question_1, question_2, question_3, question_4, question_5, question_6, question_7, question_8, question_9, question_10)
VALUES
    (1, '5', '4', '3', '5', '4', '3', '4', '5', '5', '5'),
    (2, '4', '4', '4', '4', '4', '4', '4', '4', '4', '4'),
    (3, '3', '5', '5', '5', '4', '4', '3', '3', '5', '5'),
    (4, '5', '5', '5', '5', '5', '5', '5', '5', '5', '5');
