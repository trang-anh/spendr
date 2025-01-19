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
    ('user1@example.com', '555-0001', 'password1', 'John', 'Doe', 'Male', 'New York', 'Straight', 5, 15, 'Love traveling and photography.', 'profile1.jpg', 'Yolo Spendr'),
    ('user2@example.com', '555-0002', 'password2', 'Jane', 'Smith', 'Female', 'San Francisco', 'Bisexual', 3, 10, 'Foodie and adventurer.', 'profile2.jpg', 'Balanced Budgeter'),
    ('user3@example.com', '555-0003', 'password3', 'Bob', 'Miller', 'Male', 'Chicago', 'Gay', 8, 20, 'Tech enthusiast and gamer.', 'profile3.jpg', 'Investor'),
    ('user4@example.com', '555-0004', 'password4', 'Alice', 'Jones', 'Female', 'Boston', 'Straight', 4, 12, 'Fitness fanatic and book lover.', 'profile4.jpg', 'Deal Hunter'),
    ('user5@example.com', '555-0005', 'password5', 'Tom', 'Brown', 'Male', 'Los Angeles', 'Straight', 6, 18, 'Music lover and artist.', 'profile5.jpg', 'Yolo Spendr'),
    ('user6@example.com', '555-0006', 'password6', 'Linda', 'Davis', 'Female', 'Seattle', 'Lesbian', 2, 9, 'Avid reader and traveler.', 'profile6.jpg', 'Balanced Budgeter'),
    ('user7@example.com', '555-0007', 'password7', 'Mike', 'Wilson', 'Male', 'Denver', 'Bisexual', 7, 22, 'Cyclist and nature enthusiast.', 'profile7.jpg', 'Investor'),
    ('user8@example.com', '555-0008', 'password8', 'Sara', 'Taylor', 'Female', 'Austin', 'Pansexual', 1, 5, 'Gamer and streamer.', 'profile8.jpg', 'Deal Hunter'),
    ('user9@example.com', '555-0009', 'password9', 'Chris', 'Anderson', 'Male', 'Miami', 'Straight', 9, 25, 'Photographer and blogger.', 'profile9.jpg', 'Yolo Spendr'),
    ('user10@example.com', '555-0010', 'password10', 'Emma', 'Thomas', 'Female', 'Houston', 'Asexual', 4, 14, 'Artist and designer.', 'profile10.jpg', 'Balanced Budgeter'),
    
    ('user11@example.com', '555-0011', 'password11', 'James', 'Jackson', 'Male', 'Phoenix', 'Gay', 5, 16, 'Chef and food critic.', 'profile11.jpg', 'Investor'),
    ('user12@example.com', '555-0012', 'password12', 'Olivia', 'White', 'Female', 'Philadelphia', 'Straight', 3, 11, 'Fitness trainer and yogi.', 'profile12.jpg', 'Deal Hunter'),
    ('user13@example.com', '555-0013', 'password13', 'David', 'Harris', 'Male', 'San Diego', 'Bisexual', 6, 19, 'Entrepreneur and investor.', 'profile13.jpg', 'Yolo Spendr'),
    ('user14@example.com', '555-0014', 'password14', 'Sophia', 'Martin', 'Female', 'Dallas', 'Lesbian', 2, 8, 'Writer and poet.', 'profile14.jpg', 'Balanced Budgeter'),
    ('user15@example.com', '555-0015', 'password15', 'Daniel', 'Garcia', 'Male', 'San Jose', 'Straight', 7, 21, 'Tech developer and coder.', 'profile15.jpg', 'Investor'),
    ('user16@example.com', '555-0016', 'password16', 'Isabella', 'Martinez', 'Female', 'San Francisco', 'Pansexual', 1, 6, 'Photographer and traveler.', 'profile16.jpg', 'Deal Hunter'),
    ('user17@example.com', '555-0017', 'password17', 'Matthew', 'Robinson', 'Male', 'Jacksonville', 'Asexual', 8, 24, 'Musician and songwriter.', 'profile17.jpg', 'Yolo Spendr'),
    ('user18@example.com', '555-0018', 'password18', 'Mia', 'Clark', 'Female', 'Columbus', 'Bisexual', 4, 13, 'Graphic designer and artist.', 'profile18.jpg', 'Balanced Budgeter'),
    ('user19@example.com', '555-0019', 'password19', 'Andrew', 'Rodriguez', 'Male', 'Fort Worth', 'Straight', 9, 26, 'Fitness enthusiast and coach.', 'profile19.jpg', 'Investor'),
    ('user20@example.com', '555-0020', 'password20', 'Abigail', 'Lewis', 'Female', 'Charlotte', 'Lesbian', 2, 7, 'Blogger and influencer.', 'profile20.jpg', 'Deal Hunter'),
    
    ('user21@example.com', '555-0021', 'password21', 'Joshua', 'Lee', 'Male', 'Detroit', 'Bisexual', 5, 17, 'Photographer and traveler.', 'profile21.jpg', 'Yolo Spendr'),
    ('user22@example.com', '555-0022', 'password22', 'Emily', 'Walker', 'Female', 'El Paso', 'Straight', 3, 10, 'Avid reader and writer.', 'profile22.jpg', 'Balanced Budgeter'),
    ('user23@example.com', '555-0023', 'password23', 'Ryan', 'Hall', 'Male', 'Memphis', 'Gay', 7, 20, 'Tech enthusiast and gamer.', 'profile23.jpg', 'Investor'),
    ('user24@example.com', '555-0024', 'password24', 'Madison', 'Allen', 'Female', 'Nashville', 'Bisexual', 2, 9, 'Fitness trainer and yogi.', 'profile24.jpg', 'Deal Hunter'),
    ('user25@example.com', '555-0025', 'password25', 'Nicholas', 'Young', 'Male', 'Baltimore', 'Straight', 6, 18, 'Entrepreneur and investor.', 'profile25.jpg', 'Yolo Spendr'),
    ('user26@example.com', '555-0026', 'password26', 'Ava', 'Hernandez', 'Female', 'Louisville', 'Lesbian', 1, 5, 'Writer and poet.', 'profile26.jpg', 'Balanced Budgeter'),
    ('user27@example.com', '555-0027', 'password27', 'Brandon', 'King', 'Male', 'Portland', 'Asexual', 8, 22, 'Tech developer and coder.', 'profile27.jpg', 'Investor'),
    ('user28@example.com', '555-0028', 'password28', 'Chloe', 'Wright', 'Female', 'Oklahoma City', 'Pansexual', 4, 13, 'Photographer and traveler.', 'profile28.jpg', 'Deal Hunter'),
    ('user29@example.com', '555-0029', 'password29', 'Kevin', 'Lopez', 'Male', 'Las Vegas', 'Bisexual', 9, 25, 'Musician and songwriter.', 'profile29.jpg', 'Yolo Spendr'),
    ('user30@example.com', '555-0030', 'password30', 'Lily', 'Hill', 'Female', 'Milwaukee', 'Straight', 2, 8, 'Graphic designer and artist.', 'profile30.jpg', 'Balanced Budgeter'),
    
    ('user31@example.com', '555-0031', 'password31', 'Jason', 'Scott', 'Male', 'Albuquerque', 'Gay', 5, 16, 'Fitness enthusiast and coach.', 'profile31.jpg', 'Investor'),
    ('user32@example.com', '555-0032', 'password32', 'Ella', 'Green', 'Female', 'Tucson', 'Bisexual', 3, 11, 'Blogger and influencer.', 'profile32.jpg', 'Deal Hunter'),
    ('user33@example.com', '555-0033', 'password33', 'Justin', 'Adams', 'Male', 'Fresno', 'Straight', 7, 21, 'Photographer and traveler.', 'profile33.jpg', 'Yolo Spendr'),
    ('user34@example.com', '555-0034', 'password34', 'Grace', 'Baker', 'Female', 'Sacramento', 'Lesbian', 2, 7, 'Avid reader and writer.', 'profile34.jpg', 'Balanced Budgeter'),
    ('user35@example.com', '555-0035', 'password35', 'Eric', 'Nelson', 'Male', 'Kansas City', 'Bisexual', 6, 19, 'Tech enthusiast and gamer.', 'profile35.jpg', 'Investor'),
    ('user36@example.com', '555-0036', 'password36', 'Victoria', 'Carter', 'Female', 'Mesa', 'Asexual', 1, 5, 'Fitness trainer and yogi.', 'profile36.jpg', 'Deal Hunter'),
    ('user37@example.com', '555-0037', 'password37', 'Brian', 'Mitchell', 'Male', 'Atlanta', 'Straight', 8, 24, 'Entrepreneur and investor.', 'profile37.jpg', 'Yolo Spendr'),
    ('user38@example.com', '555-0038', 'password38', 'Sophie', 'Perez', 'Female', 'Omaha', 'Lesbian', 4, 13, 'Writer and poet.', 'profile38.jpg', 'Balanced Budgeter'),
    ('user39@example.com', '555-0039', 'password39', 'Aaron', 'Roberts', 'Male', 'Colorado Springs', 'Bisexual', 9, 26, 'Tech developer and coder.', 'profile39.jpg', 'Investor'),
    ('user40@example.com', '555-0040', 'password40', 'Hannah', 'Turner', 'Female', 'Raleigh', 'Pansexual', 2, 8, 'Photographer and traveler.', 'profile40.jpg', 'Deal Hunter'),
    
    ('user41@example.com', '555-0041', 'password41', 'Adam', 'Phillips', 'Male', 'Miami', 'Asexual', 5, 17, 'Musician and songwriter.', 'profile41.jpg', 'Yolo Spendr'),
    ('user42@example.com', '555-0042', 'password42', 'Ella', 'Campbell', 'Female', 'Virginia Beach', 'Straight', 3, 10, 'Graphic designer and artist.', 'profile42.jpg', 'Balanced Budgeter'),
    ('user43@example.com', '555-0043', 'password43', 'Sean', 'Parker', 'Male', 'Oakland', 'Gay', 7, 20, 'Fitness enthusiast and coach.', 'profile43.jpg', 'Investor'),
    ('user44@example.com', '555-0044', 'password44', 'Avery', 'Evans', 'Female', 'Minneapolis', 'Bisexual', 2, 9, 'Blogger and influencer.', 'profile44.jpg', 'Deal Hunter'),
    ('user45@example.com', '555-0045', 'password45', 'Ethan', 'Edwards', 'Male', 'Tulsa', 'Straight', 6, 18, 'Photographer and traveler.', 'profile45.jpg', 'Yolo Spendr'),
    ('user46@example.com', '555-0046', 'password46', 'Zoe', 'Collins', 'Female', 'Arlington', 'Lesbian', 1, 5, 'Avid reader and writer.', 'profile46.jpg', 'Balanced Budgeter'),
    ('user47@example.com', '555-0047', 'password47', 'Logan', 'Stewart', 'Male', 'New Orleans', 'Bisexual', 8, 22, 'Tech enthusiast and gamer.', 'profile47.jpg', 'Investor'),
    ('user48@example.com', '555-0048', 'password48', 'Chloe', 'Sanchez', 'Female', 'Wichita', 'Asexual', 4, 13, 'Fitness trainer and yogi.', 'profile48.jpg', 'Deal Hunter'),
    ('user49@example.com', '555-0049', 'password49', 'Luke', 'Morris', 'Male', 'Cleveland', 'Straight', 9, 25, 'Entrepreneur and investor.', 'profile49.jpg', 'Yolo Spendr'),
    ('user50@example.com', '555-0050', 'password50', 'Lily', 'Rogers', 'Female', 'Anaheim', 'Lesbian', 2, 8, 'Writer and poet.', 'profile50.jpg', 'Balanced Budgeter'),
    ('user51@example.com', '555-0051', 'password51', 'Anh', 'Nguyen', 'Female', 'Boston', 'Straight', 3, 23, 'Need a green card.', 'profile51.jpg', 'Yolo Spendr'),
    ('user52@example.com', '555-0052', 'password52', 'Harry', 'Duong', 'Male', 'Boston', 'Gay', 5, 24, 'Cat lover.', 'profile52.jpg', 'Investor'),
    ('user53@example.com', '555-0053', 'password53', 'Gabby', 'Mehraban', 'Female', 'Boston', 'Straight', 6, 10, 'Front end developer.', 'profile53.jpg', 'Investor');


INSERT INTO Transactions (user_id, vendor_id, amount)
VALUES
    -- Transactions for User 1
    (1, 1, 45.50),
    (1, 2, 60.00),
    (1, 3, 120.75),

    -- Transactions for User 2
    (2, 2, 30.25),
    (2, 4, 80.00),
    (2, 1, 15.50),

    -- Transactions for User 3
    (3, 3, 200.00),
    (3, 4, 50.25),
    (3, 2, 75.00),

    -- Transactions for User 4
    (4, 4, 60.00),
    (4, 1, 25.50),
    (4, 3, 90.75),

    -- Transactions for User 5
    (5, 1, 55.00),
    (5, 2, 40.25),
    (5, 4, 110.00),

    -- Transactions for User 6
    (6, 3, 150.50),
    (6, 4, 70.00),
    (6, 2, 85.75),

    -- Transactions for User 7
    (7, 2, 95.00),
    (7, 1, 35.25),
    (7, 3, 130.00),

    -- Transactions for User 8
    (8, 4, 20.50),
    (8, 2, 65.00),
    (8, 1, 10.75),

    -- Transactions for User 9
    (9, 3, 180.00),
    (9, 4, 55.25),
    (9, 2, 95.00),

    -- Transactions for User 10
    (10, 1, 40.50),
    (10, 2, 85.00),
    (10, 4, 100.25),

    -- Transactions for User 11
    (11, 3, 210.00),
    (11, 4, 65.50),
    (11, 2, 115.75),

    -- Transactions for User 12
    (12, 2, 50.00),
    (12, 1, 20.25),
    (12, 4, 90.00),

    -- Transactions for User 13
    (13, 3, 160.50),
    (13, 4, 75.00),
    (13, 2, 105.75),

    -- Transactions for User 14
    (14, 2, 70.00),
    (14, 1, 30.25),
    (14, 3, 140.00),

    -- Transactions for User 15
    (15, 4, 25.50),
    (15, 2, 55.00),
    (15, 1, 12.75),

    -- Transactions for User 16
    (16, 3, 190.00),
    (16, 4, 60.25),
    (16, 2, 100.00),

    -- Transactions for User 17
    (17, 2, 85.50),
    (17, 1, 45.00),
    (17, 3, 155.75),

    -- Transactions for User 18
    (18, 4, 35.00),
    (18, 2, 75.25),
    (18, 1, 18.00),

    -- Transactions for User 19
    (19, 3, 220.00),
    (19, 4, 80.50),
    (19, 2, 125.75),

    -- Transactions for User 20
    (20, 1, 50.50),
    (20, 2, 95.00),
    (20, 4, 130.25),

    -- Transactions for User 21
    (21, 3, 170.00),
    (21, 4, 70.25),
    (21, 2, 110.00),

    -- Transactions for User 22
    (22, 2, 60.50),
    (22, 1, 25.00),
    (22, 4, 100.75),

    -- Transactions for User 23
    (23, 3, 240.00),
    (23, 4, 85.25),
    (23, 2, 135.00),

    -- Transactions for User 24
    (24, 2, 75.50),
    (24, 1, 35.00),
    (24, 3, 165.75),

    -- Transactions for User 25
    (25, 4, 30.50),
    (25, 2, 65.00),
    (25, 1, 22.25),

    -- Transactions for User 26
    (26, 3, 200.00),
    (26, 4, 90.25),
    (26, 2, 145.00),

    -- Transactions for User 27
    (27, 2, 95.50),
    (27, 1, 55.00),
    (27, 3, 175.75),

    -- Transactions for User 28
    (28, 4, 40.00),
    (28, 2, 85.25),
    (28, 1, 28.00),

    -- Transactions for User 29
    (29, 3, 260.00),
    (29, 4, 95.50),
    (29, 2, 155.75),

    -- Transactions for User 30
    (30, 1, 60.50),
    (30, 2, 105.00),
    (30, 4, 150.25),

    -- Transactions for User 31
    (31, 3, 180.00),
    (31, 4, 100.25),
    (31, 2, 160.00),

    -- Transactions for User 32
    (32, 2, 70.50),
    (32, 1, 45.00),
    (32, 4, 115.75),

    -- Transactions for User 33
    (33, 3, 280.00),
    (33, 4, 105.25),
    (33, 2, 175.00),

    -- Transactions for User 34
    (34, 2, 80.50),
    (34, 1, 55.00),
    (34, 3, 185.75),

    -- Transactions for User 35
    (35, 4, 45.50),
    (35, 2, 95.00),
    (35, 1, 32.25),

    -- Transactions for User 36
    (36, 3, 220.00),
    (36, 4, 110.25),
    (36, 2, 185.00),

    -- Transactions for User 37
    (37, 2, 105.50),
    (37, 1, 65.00),
    (37, 3, 195.75),

    -- Transactions for User 38
    (38, 4, 50.00),
    (38, 2, 105.25),
    (38, 1, 38.00),

    -- Transactions for User 39
    (39, 3, 300.00),
    (39, 4, 115.50),
    (39, 2, 195.75),

    -- Transactions for User 40
    (40, 1, 70.50),
    (40, 2, 115.00),
    (40, 4, 160.25),

    -- Transactions for User 41
    (41, 3, 190.00),
    (41, 4, 120.25),
    (41, 2, 205.00),

    -- Transactions for User 42
    (42, 2, 85.50),
    (42, 1, 75.00),
    (42, 4, 125.75),

    -- Transactions for User 43
    (43, 3, 320.00),
    (43, 4, 130.25),
    (43, 2, 215.00),

    -- Transactions for User 44
    (44, 2, 90.50),
    (44, 1, 85.00),
    (44, 3, 205.75),

    -- Transactions for User 45
    (45, 4, 55.00),
    (45, 2, 115.25),
    (45, 1, 48.00),

    -- Transactions for User 46
    (46, 3, 240.00),
    (46, 4, 135.25),
    (46, 2, 225.00),

    -- Transactions for User 47
    (47, 2, 115.50),
    (47, 1, 95.00),
    (47, 3, 215.75),

    -- Transactions for User 48
    (48, 4, 60.00),
    (48, 2, 125.25),
    (48, 1, 58.00),

    -- Transactions for User 49
    (49, 3, 340.00),
    (49, 4, 140.50),
    (49, 2, 235.75),

    -- Transactions for User 50
    (50, 1, 80.50),
    (50, 2, 135.00),
    (50, 4, 170.25),

    -- Transactions for User 51
    (51, 1, 55.75),  -- Walmart
    (51, 3, 120.50),  -- Netflix
    (51, 4, 65.00),   -- Uber

    -- Transactions for User 52
    (52, 2, 35.20),   -- McDonalds
    (52, 4, 80.45),   -- Uber
    (52, 3, 150.00),  -- Netflix

    -- Transactions for User 53
    (53, 3, 200.00),  -- Netflix
    (53, 2, 45.60),   -- McDonalds
    (53, 4, 90.30);   -- Uber

INSERT INTO SurveyResponses (user_id, question_1, question_2, question_3, question_4, question_5, question_6, question_7, question_8, question_9, question_10)
VALUES
    -- SurveyResponses for User 1
    (1, '5', '4', '3', '5', '4', '3', '4', '5', '5', '5'),
    -- SurveyResponses for User 2
    (2, '4', '4', '4', '4', '4', '4', '4', '4', '4', '4'),
    -- SurveyResponses for User 3
    (3, '3', '5', '5', '5', '4', '4', '3', '3', '5', '5'),
    -- SurveyResponses for User 4
    (4, '5', '5', '5', '5', '5', '5', '5', '5', '5', '5'),
    -- SurveyResponses for User 5
    (5, '2', '3', '4', '2', '3', '4', '2', '3', '4', '2'),
    -- SurveyResponses for User 6
    (6, '3', '2', '5', '3', '2', '5', '3', '2', '5', '3'),
    -- SurveyResponses for User 7
    (7, '4', '3', '4', '3', '4', '3', '4', '3', '4', '3'),
    -- SurveyResponses for User 8
    (8, '1', '2', '3', '1', '2', '3', '1', '2', '3', '1'),
    -- SurveyResponses for User 9
    (9, '5', '4', '5', '4', '5', '4', '5', '4', '5', '4'),
    -- SurveyResponses for User 10
    (10, '2', '2', '2', '2', '2', '2', '2', '2', '2', '2'),
    
    -- SurveyResponses for User 11
    (11, '3', '4', '3', '4', '3', '4', '3', '4', '3', '4'),
    -- SurveyResponses for User 12
    (12, '4', '3', '4', '3', '4', '3', '4', '3', '4', '3'),
    -- SurveyResponses for User 13
    (13, '5', '5', '5', '5', '5', '5', '5', '5', '5', '5'),
    -- SurveyResponses for User 14
    (14, '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'),
    -- SurveyResponses for User 15
    (15, '3', '3', '3', '3', '3', '3', '3', '3', '3', '3'),
    -- SurveyResponses for User 16
    (16, '4', '5', '4', '5', '4', '5', '4', '5', '4', '5'),
    -- SurveyResponses for User 17
    (17, '2', '2', '2', '2', '2', '2', '2', '2', '2', '2'),
    -- SurveyResponses for User 18
    (18, '5', '4', '3', '5', '4', '3', '4', '5', '4', '3'),
    -- SurveyResponses for User 19
    (19, '3', '4', '5', '3', '4', '5', '3', '4', '5', '3'),
    -- SurveyResponses for User 20
    (20, '4', '3', '4', '3', '4', '3', '4', '3', '4', '3'),
    
    -- SurveyResponses for User 21
    (21, '2', '3', '2', '3', '2', '3', '2', '3', '2', '3'),
    -- SurveyResponses for User 22
    (22, '5', '5', '5', '5', '5', '5', '5', '5', '5', '5'),
    -- SurveyResponses for User 23
    (23, '1', '2', '1', '2', '1', '2', '1', '2', '1', '2'),
    -- SurveyResponses for User 24
    (24, '3', '3', '3', '3', '3', '3', '3', '3', '3', '3'),
    -- SurveyResponses for User 25
    (25, '4', '4', '4', '4', '4', '4', '4', '4', '4', '4'),
    -- SurveyResponses for User 26
    (26, '2', '4', '2', '4', '2', '4', '2', '4', '2', '4'),
    -- SurveyResponses for User 27
    (27, '5', '3', '5', '3', '5', '3', '5', '3', '5', '3'),
    -- SurveyResponses for User 28
    (28, '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'),
    -- SurveyResponses for User 29
    (29, '4', '5', '4', '5', '4', '5', '4', '5', '4', '5'),
    -- SurveyResponses for User 30
    (30, '3', '2', '3', '2', '3', '2', '3', '2', '3', '2'),
    
    -- SurveyResponses for User 31
    (31, '5', '4', '5', '4', '5', '4', '5', '4', '5', '4'),
    -- SurveyResponses for User 32
    (32, '2', '3', '2', '3', '2', '3', '2', '3', '2', '3'),
    -- SurveyResponses for User 33
    (33, '4', '4', '4', '4', '4', '4', '4', '4', '4', '4'),
    -- SurveyResponses for User 34
    (34, '1', '2', '1', '2', '1', '2', '1', '2', '1', '2'),
    -- SurveyResponses for User 35
    (35, '3', '5', '3', '5', '3', '5', '3', '5', '3', '5'),
    -- SurveyResponses for User 36
    (36, '4', '3', '4', '3', '4', '3', '4', '3', '4', '3'),
    -- SurveyResponses for User 37
    (37, '2', '2', '2', '2', '2', '2', '2', '2', '2', '2'),
    -- SurveyResponses for User 38
    (38, '5', '5', '5', '5', '5', '5', '5', '5', '5', '5'),
    -- SurveyResponses for User 39
    (39, '1', '3', '1', '3', '1', '3', '1', '3', '1', '3'),
    -- SurveyResponses for User 40
    (40, '4', '4', '4', '4', '4', '4', '4', '4', '4', '4'),
    
    -- SurveyResponses for User 41
    (41, '3', '4', '3', '4', '3', '4', '3', '4', '3', '4'),
    -- SurveyResponses for User 42
    (42, '2', '5', '2', '5', '2', '5', '2', '5', '2', '5'),
    -- SurveyResponses for User 43
    (43, '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'),
    -- SurveyResponses for User 44
    (44, '4', '3', '4', '3', '4', '3', '4', '3', '4', '3'),
    -- SurveyResponses for User 45
    (45, '5', '5', '5', '5', '5', '5', '5', '5', '5', '5'),
    -- SurveyResponses for User 46
    (46, '2', '3', '2', '3', '2', '3', '2', '3', '2', '3'),
    -- SurveyResponses for User 47
    (47, '4', '4', '4', '4', '4', '4', '4', '4', '4', '4'),
    -- SurveyResponses for User 48
    (48, '1', '2', '1', '2', '1', '2', '1', '2', '1', '2'),
    -- SurveyResponses for User 49
    (49, '3', '5', '3', '5', '3', '5', '3', '5', '3', '5'),
    -- SurveyResponses for User 50
    (50, '4', '3', '4', '3', '4', '3', '4', '3', '4', '3'),

    -- SurveyResponses for User 51
    (51, '3', '4', '2', '5', '3', '4', '2', '5', '3', '4'),

    -- SurveyResponses for User 52
    (52, '4', '5', '3', '4', '5', '3', '4', '5', '3', '4'),

    -- SurveyResponses for User 53
    (53, '2', '3', '4', '2', '3', '4', '2', '3', '4', '2');
