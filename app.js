var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var probModel = require('./server/problemModel')

// console.log(Object.keys(mongoose));

mongoose.connect('mongodb://localhost/regextreme');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Database error!', err);
});
db.once('open', function() {
  console.log('Database connection success!');
  // probModel.addOne({
  //   prompt: 'Sample prompt 3: Match the numeric characters!',
  //   text: 'aa2bccc4dde6ee',
  //   expected: JSON.stringify(['2', '4', '6'])
  // });
  probModel.grabNext()
  .then(function(data) {
    console.log(data)});
});



var app = express();
var port = 3000;

app.get('/api/prompt', function(req, res) {
  probModel.grabNext()
  .then(function(data) {
    console.log(data);
    res.send(data);
  });
  console.log('got request');
});

app.use(express.static('client'));

// app.get('/', function(req, res) {
//   res.send('/client');
// });

app.listen(port, function() {
  console.log('put it in my', port);
});
