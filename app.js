var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = 3000;

app.use(express.static('client'));

// app.get('/', function(req, res) {
//   res.send('/client');
// });

app.listen(port, function() {
  console.log('listening on', port);
});
