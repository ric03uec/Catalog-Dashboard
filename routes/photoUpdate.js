'use strict'

var util = require('util');
var logger = require('devnull');
var Moment = require('moment');
var db = require('../models/db');
var logger = new logger({namespacing : 0});
var catalog = require('../models/catalog');

var photoUpdate = {};

photoUpdate.show = function(req, res){
  logger.log('serving request for url [GET] ' + req.route.path);
  res.render('photoUpdate',{title : 'catalog Dashboard', 
                entryId : req.params.id});
};

photoUpdate.save = function(req, res){
  var compDate = req.body.photoCompleteDate;
  compDate = Moment(compDate,"DD/MM/YYYY").format('YYYY-MM-DD');
  var noOfImages = req.body.noOfImages;
  var editingAssignedTo = req.body.editingAssignedTo;
  var rawImageLocation = req.body.rawImageLocation;
  var imgAssignDate = req.body.imageAssignDate;
  imgAssignDate= Moment(imgAssignDate,"DD/MM/YYYY").format('YYYY-MM-DD');

  var queryStr = 'update entries set photo_complete_date = "' +compDate+ '", ' +
                  'no_of_images=' + noOfImages + ', ' +
                  ' editing_assigned_to = "' + editingAssignedTo + '", ' +
                  ' raw_image_location = "' + rawImageLocation + '", ' +
                  ' image_assignment_date = "' + imgAssignDate + '" ' +
                  ' where id = ' + req.body.entryId + ' ; ' ;
  db.query(queryStr, function(err, results){
    if(!err && results){
      res.redirect('/dashboard');
    }else{
      logger.error('Error updating table for Content Assignment');
    }
  });
};
module.exports = photoUpdate;
