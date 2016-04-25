var router = require('express').Router();
var pg = require('pg');
var path = require('path');
var connectionString = require ('../models/database').connectionString;

router.post('/add', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      var result = [];
      var list_item = req.body.list_item;


      var query = client.query('INSERT INTO list (list_item) VALUES ($1) ' +
        'RETURNING id, list_item '[list_item]);

      query.on('row', function(row){
        result.push(row);
      });

      query.on('end', function() {
        done();
        res.send(result);
      });

      query.on('error', function(error) {
        console.error('Error running query:', error);
        done();
        res.status(500).send(error);
      });
    }
  });
});
router.get('/all', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    if(err){

  console.log(err);
  res.sendStatus(500);
    } else {
      var query = client.query('SELECT * FROM list');
      var results = [];

      query.on('error', function(error){
        console.log(error);
        done();
        res.sendStatus(500);
      });

      query.on('row', function(rowData){
        results.push(rowData);

      });

      query.on('end', function(){
        res.send(results);
        done();
      });
    }
  });
});


module.exports = router;
