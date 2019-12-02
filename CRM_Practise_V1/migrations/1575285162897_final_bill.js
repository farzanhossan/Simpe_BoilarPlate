module.exports = {
    "up": "CREATE TABLE final_bill (id INT AUTO_INCREMENT,UNIQUE KEY id (id), customer_id INT(30) NOT NULL, payment INT(30) NOT NULL, created_at DATETIME, FOREIGN KEY (customer_id) REFERENCES customers(id) )",
    "down": "DROP TABLE final_bill"
}