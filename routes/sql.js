const express = require('express');
const mysql = require('mysql');

const router = express.Router();

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


const createResponse = (success, results, error) => {
  return JSON.stringify({
    success,
    results,
    error,
  });
};

router.get('/', function (req, res, next) {
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

router.post('/', function (req, res, next) {
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

module.exports = router;