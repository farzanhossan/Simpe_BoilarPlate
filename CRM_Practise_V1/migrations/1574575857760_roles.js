module.exports = {
    "up": "CREATE TABLE roles (id INT AUTO_INCREMENT, UNIQUE KEY id (id), role VARCHAR(30) NOT NULL )",
    "down": "DROP TABLE roles"
}