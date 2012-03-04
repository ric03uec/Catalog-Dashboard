'use strict'

var util = require('util');
var db = require('./db');

var catalog = {};

catalog.getAll = function(callback){
  var queryStr = 'select * from entries ';
  db.query(queryStr, function(err, results){
    if(!err && results){
      callback(null, results);
    }else{
      util.error('Error fetching all the entries from DB : ' + err);
      callback(err);
    }
  });
};


module.exports = catalog;
//---------------------------------//
(function(){
  if(require.main === module){
    catalog.getAll(function(err, res){
      console.log(err || res);  
    });
  }
 
})();
