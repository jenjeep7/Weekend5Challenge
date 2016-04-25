var express = require('express');
var bodyParser = require('body-parser');
// var port = process.env.PORT || 3000;

////REQUIRE DATABASE

var initializeDB = require('./models/database').initializeDB;

/////////ROUTERS////////

var index = require('./routes/index');
var list = require('./routes/list');
var app = express();

app.use(express.static('server/public'));
app.use(bodyParser.json());

app.use('/', index);
app.use('/list', list);

//DATABASE/////////
initializeDB();

var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log("Listening on port: ", port);
});
