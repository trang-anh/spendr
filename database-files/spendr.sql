CREATE DATABASE IF NOT EXISTS spendr;
USE spendr;
SHOW TABLES;

CREATE TABLE IF NOT EXISTS Category (
    category_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    category_name VARCHAR(50) NOT NULL,
    emoji_column VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
);

CREATE TABLE IF NOT EXISTS Vendors (
vendor_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
vendor_name VARCHAR(50) NOT NULL,
category_id INT,
FOREIGN KEY(category_id) REFERENCES Category (category_id)
    ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Users
(
    user_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    gmail VARCHAR(100),
    phone VARCHAR(100),
    password VARCHAR(100),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    location VARCHAR(50) NOT NULL,
    sexuality VARCHAR (50) NOT NULL,
    left_swipes INT DEFAULT 0,
    right_swipes INT DEFAULT 0,
    biography TEXT,
    profile_picture VARCHAR(255),
    is_active BOOL DEFAULT 1,
    user_type ENUM('Yolo Spendr','Investor','Balanced Budgeter', 'Deal Hunter'),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Transactions
(
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    vendor_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_id INT,
    amount DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

CREATE TABLE IF NOT EXISTS SurveyResponses
(
    user_id INT,
    question_1 ENUM('1', '2', '3', '4', '5'),
    question_2 ENUM('1', '2', '3', '4', '5'),
    question_3 ENUM('1', '2', '3', '4', '5'),
    question_4 ENUM('1', '2', '3', '4', '5'),
    question_5 ENUM('1', '2', '3', '4', '5'),
    question_6 ENUM('1', '2', '3', '4', '5'),
    question_7 ENUM('1', '2', '3', '4', '5'),
    question_8 ENUM('1', '2', '3', '4', '5'),
    question_9 ENUM('1', '2', '3', '4', '5'),
    question_10 ENUM('1', '2', '3', '4', '5'),
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

