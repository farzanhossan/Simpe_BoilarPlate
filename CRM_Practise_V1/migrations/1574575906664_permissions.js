module.exports = {
    "up": "CREATE TABLE permissions (id INT AUTO_INCREMENT, UNIQUE KEY id (id), permission_name VARCHAR(30) NOT NULL )",
    "down": "DROP TABLE permissions"
}