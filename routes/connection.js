const mysql = require('mysql');

//connect to mysql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'letterbox'
});
try {
  connection.connect();
} catch (e) {
  console.log('database connection failed:', e);
}

module.exports = connection;