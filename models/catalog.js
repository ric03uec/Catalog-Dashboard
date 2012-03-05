'use strict'

var util = require('util');
var db = require('./db');
var Moment = require('moment');

var catalog = {};

catalog.getAll = function(callback){
  var queryStr = 'select * from entries ';
  db.query(queryStr, function(err, results){
    if(!err && results){
      for(var i = 0 ; i < results.length ; i++){
        var date = results[i]['stock_arrival_date'];
        date = Moment(date+ '', "ddd, DD MMM YYYY hh:mm:ss zz")
        date = Moment(date).format('DD-MM-YYYY');
        results[i]['stock_arrival_date'] = date;
      }
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
