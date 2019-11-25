module.exports = {
    "up": "CREATE TABLE users (id INT AUTO_INCREMENT, UNIQUE KEY id (id), name VARCHAR(30) NOT NULL, email VARCHAR(30) NOT NULL, password VARCHAR(30) NOT NULL, phone_number VARCHAR(30) NOT NULL, role_id INT(30) NOT NULL )",
    "down": "DROP TABLE users"
}