'use strict'

var util = require('util');
var logger = require('devnull');
var Moment = require('moment');
var db = require('../models/db');
var logger = new logger({namespacing : 0});
var catalog = require('../models/catalog');

var imgApproval = {};

imgApproval.show = function(req, res){
  logger.log('serving request for url [GET] ' + req.route.path);
  res.render('imgApproval',{title : 'catalog Dashboard', 
                formName : 'Approve and Rate Images',
                entryId : req.params.id});
};

imgApproval.save = function(req, res){
  var approvedImgPath = req.body.approvedImagePath;
  var approvedImages = req.body.approvedImages;
  var approvedDate = req.body.approvedDate;
  approvedDate = Moment(approvedDate,"DD/MM/YYYY").format('YYYY-MM-DD');
  var rating = req.body.rating;

  var queryStr = 'update entries set approved_image_path= "' + approvedImgPath + '" ' +
                ', approved_images ="' + approvedImages + '" ' +  
                ', approved_date = "' + approvedDate + '" ' +
                ', rating = "' + rating + '" ' + 
                ' where id = ' + req.body.entryId + ' ;'; 
 
  db.query(queryStr, function(err, results){
    if(!err && results){
      res.redirect('/dashboard');
    }else{
      logger.error('Error updating table for Content Assignment');
    }
  });
};

module.exports = imgApproval ;
