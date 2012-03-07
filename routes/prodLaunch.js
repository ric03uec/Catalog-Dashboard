'use strict'

var util = require('util');
var logger = require('devnull');
var Moment = require('moment');
var db = require('../models/db');
var logger = new logger({namespacing : 0});
var catalog = require('../models/catalog');

var prodLaunch = {};

prodLaunch.show = function(req, res){
  logger.log('serving request for url [GET] ' + req.route.path);
  res.render('prodLaunch',{title : 'catalog Dashboard', 
                formName : 'Product Launch Complete',
                entryId : req.params.id});
};

prodLaunch.save = function(req, res){
  var launchDate = req.body.launchDate;
  launchDate = Moment(launchDate,"DD/MM/YYYY").format('YYYY-MM-DD');
  var launchComplete = req.body.launchComplete === 'on' ? 1 : 0;
  var queryStr = 'update entries set launch_date = "' + launchDate + '" ' +
                ', launch_complete ="' + launchComplete + '" ' +  
                ' where id = ' + req.body.entryId + ' ;'; 
  
  db.query(queryStr, function(err, results){
    if(!err && results){
      res.redirect('/dashboard');
    }else{
      logger.error('Error updating table for Content Assignment');
    }
  });
};

module.exports = prodLaunch;
