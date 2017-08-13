const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

//middlewares
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
const index = require('./routes/index');
const sql = require('./routes/sql');
app.use('/', index);
app.use('/sql', sql);


// start http server
const port = process.env.PORT || 3000;
http.createServer(app).listen(port, function () {
  console.log('Server listening on port ' + port);
});