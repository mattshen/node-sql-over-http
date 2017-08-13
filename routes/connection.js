const mysql = require('mysql');


//connect to mysql
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_SCHEMA || 'test',
});
try {
  connection.connect();
} catch (e) {
  console.log('database connection failed:', e);
}

module.exports = connection;