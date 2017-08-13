const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

//environment check
const NODE_ENV = process.env.NODE_ENV || 'dev';
console.log('Current Environment: ' + NODE_ENV);

//middlewares
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (NODE_ENV === 'production') {
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
let contextPath = process.env.APP_CONTEXT_PATH || '';
app.use(contextPath + '/', index);
app.use(contextPath + '/sql', sql);
app.use(contextPath + '/insert', insert);


// start http server
const port = process.env.PORT || 3000;
http.createServer(app).listen(port, function () {
  console.log('Server listening on port ' + port);
});