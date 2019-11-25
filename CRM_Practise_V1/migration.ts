const mysql = require('mysql');
const migration = require('mysql-migrations');

const connection = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : 'Admin@123',
  database : 'crm_v1'
});

migration.init(connection, __dirname + '/migrations');