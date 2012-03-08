'use strict'

var util = require('util');
var logger = require('devnull');
var Moment = require('moment');
var db = require('../models/db');
var logger = new logger({namespacing : 0});
var catalog = require('../models/catalog');

var editUpdate = {};

editUpdate .show = function(req, res){
  logger.log('serving request for url [GET] ' + req.route.path);
  res.render('editingUpdate',{title : 'catalog Dashboard', 
                formName : 'Submitted Images for Approval',
                entryId : req.params.id});
};

editUpdate .save = function(req, res){

  var editedImgPath= escape(req.body.editedImagePath);
  var editCompDate= req.body.editingCompDate;
  editCompDate= Moment(editCompDate,"DD/MM/YYYY").format('YYYY-MM-DD');
  var queryStr = 'update entries set editing_completion_date= "' +editCompDate+ '" ' +
                ', edited_image_path="' + editedImgPath + '" ' +  
                ' where id = ' + req.body.entryId + ';'; 
  
  db.query(queryStr, function(err, results){
    if(!err && results){
      res.redirect('/dashboard');
    }else{
      logger.error('Error updating table for Edit Update: ' + err);
    }
  });
};

module.exports = editUpdate ;
