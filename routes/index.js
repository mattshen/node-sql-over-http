var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<html><body><p>Welcome to SQL over HTTP</p></body></html>');
});

module.exports = router;