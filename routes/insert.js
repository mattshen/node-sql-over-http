const express = require('express');

const connection = require('./connection');
const createResponse = require('./createResponse');
const router = express.Router();

router.post('/', function (req, res, next) {
  const table = req.body.table;
  const records = req.body.records;
  const columns = Object.keys(records[0])
  const values = records.map(record => columns.map( column => record[column]));

  const joinedColumns = columns.join(', ');
  connection.query(`INSERT INTO ${table} (${joinedColumns}) values ?`, [values], function (err, result) {
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