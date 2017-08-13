


app.get('/sql', function (req, res){
  console.log(req.header('sql'));

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify({success: true}));
});