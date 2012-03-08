'use strict'

var util = require('util');
var logger = require('devnull');
var Moment = require('moment');
var db = require('../models/db');
var logger = new logger({namespacing : 0});
var catalog = require('../models/catalog');

var main = {};

var convertDate = function(dateStr){
  if(null !== dateStr){
    var date = Moment(dateStr + '', "ddd MMM DD YYYY hh:mm:ss zz");
    date = Moment(date).format("DD-MM-YYYY");
    return date;
  }else{
    return 'Incomplete';
  }
};

main.show = function(req, res){
  var queryStr = 'select * from entries where id =' + req.params.id + ';';
  db.query(queryStr, function(err, results){
    var entry = results[0]; 
    entry['stock_arrival_date'] = convertDate(entry['stock_arrival_date']);
    entry['content_assign_date'] = convertDate(entry['content_assign_date']);
    entry['catalog_submission_date'] = convertDate(entry['catalog_submission_date']);
    entry['photo_complete_date'] = convertDate(entry['photo_complete_date']);
    entry['image_assignment_date']=convertDate(entry['image_assignment_date']);
    entry['editing_completion_date']=convertDate(entry['editing_completion_date']);
    entry['approved_date'] = convertDate(entry['approved_date']);
    entry['launch_date'] = convertDate(entry['launch_date']);

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
