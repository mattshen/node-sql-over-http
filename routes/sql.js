const express = require('express');

const connection = require('./connection');
const createResponse = require('./createResponse');
const router = express.Router();


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