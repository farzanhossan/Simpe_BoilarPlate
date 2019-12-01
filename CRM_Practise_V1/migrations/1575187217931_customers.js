module.exports = {
    "up": "CREATE TABLE customers (id INT AUTO_INCREMENT, UNIQUE KEY id (id), name VARCHAR(30) NOT NULL, email VARCHAR(30) NOT NULL, password VARCHAR(30) NOT NULL, phone_number VARCHAR(30) NOT NULL, status VARCHAR(30) NOT NULL, notes VARCHAR(500) NOT NULL ,service_id INT(30) NOT NULL, FOREIGN KEY (service_id) REFERENCES services(id) )",
    "down": "DROP TABLE customers"
}