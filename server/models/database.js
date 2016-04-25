var pg = require('pg');

var connectionString;

if(process.env.DATABASE_URL){
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgress://localhost:5432/makeList';
}

function initializeDB(){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('Error connecting to DB!', err);
      process.exit(1);
    } else {
      var query = client.query('CREATE TABLE IF NOT EXISTS list('+
        'id SERIAL PRIMARY KEY,' +
        'list_item varchar(225) NOT NULL)');

        query.on('end', function(){
          console.log('Sucessfully ensured schema exists');
          done();
        });
        query.on('error', function(){
          console.log('Error Creating schema!');
          process.exit(1);
        });

    }
  });
}
module.exports.connectionString = connectionString;
module.exports.initializeDB = initializeDB;
