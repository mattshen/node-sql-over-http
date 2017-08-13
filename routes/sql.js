const express = require('express');

const connection = require('./connection');
const createResponse = require('./createResponse');
const router = express.Router();


router.post('/', function (req, res, next) {
  const query = req.header('query') || req.body.query;
  connection.query(query, function (err, result) {
    if (!err) {
      let response = null;

      if (result.length === 0 || result.affectedRows === 0 ) {
        response = createResponse(true, result);
      } else if (result.length || result.affectedRows) {
        response = createResponse(true, result);
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