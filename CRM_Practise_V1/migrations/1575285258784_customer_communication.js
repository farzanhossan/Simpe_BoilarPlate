module.exports = {
    "up": "CREATE TABLE customer_communication (id INT AUTO_INCREMENT, UNIQUE KEY id (id), customer_id INT(30) NOT NULL , message varchar(500) NOT NULL, FOREIGN KEY (customer_id) REFERENCES customers(id) )",
    "down": "DROP TABLE customer_communication"
}