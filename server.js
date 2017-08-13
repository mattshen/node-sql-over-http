const http = require('http');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

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

//middlewares
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.get('/', function (req, res) {
  res.send('<html><body><p>Welcome to SQL over HTTP</p></body></html>');
});

const createResponse = (success, results, error) => {
  return JSON.stringify({
    success,
    results,
    error,
  });
};
app.get('/sql', function (req, res) {
  const sql = req.header('query');
  connection.query(sql, function (err, rows, fields) {
    if (!err) {
      let response = null;
      if (rows.length != 0) {
        response = createResponse(true, rows);
      } else {
        response = createResponse(false, undefined, 'No Results Found'); 
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(response);
    } else {
      res.status(400).send(createResponse(false, undefined, err));
    }
  });
});

app.post('/sql', function (req, res) {
  const sql = req.header('query');
  connection.query(sql, function (err, result) {
    if (!err) {
      let response = null;
      if (result.affectedRows != 0) {
        response = createResponse(true, result);;
      } else {
        response = createResponse(false, undefined, 'No Result Found');
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(response);
    } else {
      res.status(400).send(createResponse(false, undefined, err));
    }
  });
});

// start http server
const port = process.env.PORT || 3000;
http.createServer(app).listen(port, function () {
  console.log('Server listening on port ' + port);
});