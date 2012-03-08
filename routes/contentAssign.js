'use strict'

var util = require('util');
var logger = require('devnull');
var Moment = require('moment');
var db = require('../models/db');
var logger = new logger({namespacing : 0});
var catalog = require('../models/catalog');

var contentAssign = {};

contentAssign.show = function(req, res){
  logger.log('serving request for url [GET] ' + req.route.path);
  res.render('contentAssign',{title : 'catalog Dashboard', 
                entryId : req.params.id,
                formName : 'Content Assignee'});
};

contentAssign.save = function(req, res){
  logger.log('serving request for url [post] ' + req.route.path);
 
  var contentAssignee = req.body.contentAssignee;
  var assignDate = req.body.contentAssignDate;
  assignDate = Moment(assignDate,"DD/MM/YYYY").format('YYYY-MM-DD');
  var queryStr = 'update entries set content_asignee="' +contentAssignee+
                  '" ' + ', content_assign_date = "' + assignDate+ 
                  '" '+ ' where id = ' + req.body.entryId + ';';
  db.query(queryStr, function(err, results){
    if(!err && results){
      res.redirect('/dashboard');
    }else{
      logger.error('Error updating table for Content Assignment :' + err);
    }
  });
};

module.exports = contentAssign;
