module.exports = {
    "up": "CREATE TABLE role_permission (id INT AUTO_INCREMENT, UNIQUE KEY id (id), role_id INT(30) NOT NULL, permission_id INT(30) NOT NULL, FOREIGN KEY (role_id) REFERENCES roles(id), FOREIGN KEY (permission_id) REFERENCES permissions(id) )",
    "down": "DROP TABLE role_permission"
}