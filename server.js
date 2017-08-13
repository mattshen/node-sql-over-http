const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

//environment check
const CURRENT_ENV = process.env.CURRENT_ENV || 'dev';
console.log('Current Environment: ' + CURRENT_ENV);

//middlewares
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let routerPrefix = '';
if (CURRENT_ENV === 'prod') {
  routerPrefix = 'soh';
  const basicAuth = require('express-basic-auth')
  app.use(basicAuth({
      users: { 'user1': 'mingtian123' },
      challenge: true
  }));
}

//routes
const index = require('./routes/index');
const sql = require('./routes/sql');
const insert = require('./routes/insert');
app.use(routerPrefix + '/', index);
app.use(routerPrefix + '/sql', sql);
app.use(routerPrefix + '/insert', insert);


// start http server
const port = process.env.PORT || 3000;
http.createServer(app).listen(port, function () {
  console.log('Server listening on port ' + port);
});