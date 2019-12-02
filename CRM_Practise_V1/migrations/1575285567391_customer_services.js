module.exports = {
    "up": "CREATE TABLE customer_services (id INT AUTO_INCREMENT, UNIQUE KEY id (id) ,customer_id INT(30) NOT NULL, service_id INT(30) NOT NULL, package_id INT(30) NOT NULL, created_at DATETIME, FOREIGN KEY (customer_id) REFERENCES customers(id), FOREIGN KEY (service_id) REFERENCES services(id), FOREIGN KEY (package_id) REFERENCES packages(id) )",
    "down": "DROP TABLE customer_services"
}