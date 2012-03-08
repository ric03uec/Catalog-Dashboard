'use strict'

var util = require('util');
var mysql = require('mysql');
var dbConfig = require('../config').db;

var db = mysql.createClient({
  'user' : dbConfig.user,
  'password': dbConfig.password
});

db.on('connect', function() { 
  client.query('use ' + dbConfig.database); 
});

db.useDatabase(dbConfig.database, function(err, res){
 if(err){
    util.log('error while selecting the database');
  }else{
    util.log('Database successfully selected');
  }
});

db.ping(function(err){
  if(err){
    util.log('error while connecting to database');
  }else{
    util.log('Connected to database');
  }
});

module.exports = db;
//------------------------------//
if(require.main == module){
  (function(){
    db.query('select * from entries', function(err, results, fields){
      console.log(err);
      //console.log(results);
    }); 
  })()
}
