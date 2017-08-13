// Basic Setup
var http     = require('http'),
	express  = require('express'),
	mysql    = require('mysql'),
  bodyParser   = require('body-parser');
 
// Database Connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'letterbox'
});

try {
	connection.connect();
} catch(e) {
	console.log('Database Connetion failed:' + e);
}
 
 
// Setup express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 5000);
 
// Set default route
app.get('/', function (req, res) {
	res.send('<html><body><p>Welcome to SQL over REST</p></body></html>');
});

app.get('/sql', function (req, res){
  const sql = req.header('sql');
  
	connection.query(sql, function(err, rows, fields) {
    if (!err){
      let response = {};

      if (rows.length != 0) {
        response = {'result' : 'success', 'data' : rows};
      } else {
        response = {'result' : 'error', 'msg' : 'No Results Found'};
      }

      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(response));
    } else {
      res.status(400).send(err);
    }
	});

});

app.post('/sql', function (req,res) {
  const sql = req.header('sql');
   
		connection.query(sql, function(err, result) {
      if (!err){
        let response = {};
        if (result.affectedRows != 0) {
          response = {'result' : 'success'};
        } else {
          response = {'result' : 'error', 'msg' : 'No Result Found'};
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(response));
      } else {
        res.status(400).send(err);
      }
    });
 
});
 
// Create server
http.createServer(app).listen(app.get('port'), function(){
	console.log('Server listening on port ' + app.get('port'));
});