var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db/index');

var app = express();

app.all('*', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,accept,access_token,X-Requested-With');
  res.type('json');
  return next();
});

// for parsing application/json
app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/films', db.findAllFilms);
app.get('/films/:id', db.findDetailByID);
app.post('/films/:id', db.editDetailByID);

app.listen(3000, function() {
  console.log('Listening on port 3000 ...')
});
