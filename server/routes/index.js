var express = require('express');
var path = require('path');
var router = express.Router();
var list = require('./list');
// var database = require('../../server/models/database')

router.get('/', function(request, response){
  console.log(__dirname);
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});
router.use('/list', list);


module.exports = router;
