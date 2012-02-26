'use strict'

var util = require('util');
var mysql = require('mysql');
var DATABASE = 'catalog_dashboard';

var db = mysql.createClient({
  'user' : 'root',
  'password': 'root'
});

db.query('use catalog_dashboard');

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
      console.log(results);
    }); 
  })()
}
