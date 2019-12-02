module.exports = {
    "up": "CREATE TABLE billings (id INT AUTO_INCREMENT, UNIQUE KEY id (id), customer_id INT(30) NOT NULL , discount INT(30) NOT NULL, payable INT(30) NOT NULL, receivable INT(30) NOT NULL, created_at DATETIME, FOREIGN KEY (customer_id) REFERENCES customers(id) )",
    "down": "DROP TABLE billings"
}