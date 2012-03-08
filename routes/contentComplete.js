'use strict'

var util = require('util');
var logger = require('devnull');
var Moment = require('moment');
var db = require('../models/db');
var logger = new logger({namespacing : 0});
var catalog = require('../models/catalog');

var contentComplete = {};

contentComplete.show = function(req, res){
  logger.log('serving request for url [GET] ' + req.route.path);
  res.render('contentComplete',{title : 'catalog Dashboard', 
                formName : 'Request Images',
                entryId : req.params.id});
};

contentComplete.save = function(req, res){
  var catalogName = req.body.catalogName;
  var subDate = req.body.catalogSubDate;
  subDate= Moment(subDate,"DD/MM/YYYY").format('YYYY-MM-DD');
  var queryStr = 'update entries set catalog_name = "' + catalogName + '" ' +
                ', catalog_submission_date="' + subDate + '" ' +  
                ' where id = ' + req.body.entryId + ' ;'; 
  
  db.query(queryStr, function(err, results){
    if(!err && results){
      res.redirect('/dashboard');
    }else{
      logger.error('Error updating table for Content Complete : ' + err);
    }
  });
};

module.exports = contentComplete;
