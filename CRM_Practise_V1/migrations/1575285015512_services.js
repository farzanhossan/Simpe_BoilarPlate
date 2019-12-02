module.exports = {
    "up": "CREATE TABLE services (id INT AUTO_INCREMENT, UNIQUE KEY id (id), name VARCHAR(30) NOT NULL)",
    "down": "DROP TABLE services"
}