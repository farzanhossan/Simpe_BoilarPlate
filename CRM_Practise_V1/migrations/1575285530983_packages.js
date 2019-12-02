module.exports = {
    "up": "CREATE TABLE packages (id INT AUTO_INCREMENT, UNIQUE KEY id (id), name VARCHAR(500) NOT NULL, price INT(30) NOT NULL, service_id INT(30) NOT NULL, monthly_pay INT(30) NOT NULL, created_at DATETIME, FOREIGN KEY (service_id) REFERENCES services(id) )",
    "down": "DROP TABLE packages"
}