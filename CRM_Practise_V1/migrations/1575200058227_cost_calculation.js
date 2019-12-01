module.exports = {
    "up": "CREATE TABLE cost_calculation (id INT AUTO_INCREMENT, UNIQUE KEY id (id), customer_id INT(30) NOT NULL , discount INT(30) NOT NULL, monthly_pay INT(30) NOT NULL, due_amount INT(30) NOT NULL ,FOREIGN KEY (customer_id) REFERENCES customers(id) )",
    "down": "DROP TABLE cost_calculation"
}