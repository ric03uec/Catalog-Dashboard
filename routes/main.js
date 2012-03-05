'use strict'

var util = require('util');
var logger = require('devnull');
var Moment = require('moment');
var db = require('../models/db');
var logger = new logger({namespacing : 0});
var catalog = require('../models/catalog');

var main = {};

main.show = function(req, res){
  var queryStr = 'select * from entries where id =' + req.params.id + ';';
  db.query(queryStr, function(err, results){
    var entry = results[0]; 
    var date = entry['stock_arrival_date'];
    date = Moment(date + '', "ddd, DD MMM YYYY hh:mm:ss zz");
    date = Moment(date).format('DD-MM-YYYY');
    entry['stock_arrival_date'] = date;
    res.render('showEntry' , {title : 'catalog Dashboard','entry': entry}); 
  });
};

module.exports = main;
//-------------------------------------//
if(require.main == module){
  (function(){
    db.query('select * from entries where id = 1;', function(err, results, fields){
      console.log(results);
    }); 
  })()
}
