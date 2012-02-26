'use strict'

var util = require('util');
var Logger = require('devnull');
var db = require('../models/db');
var logger = new Logger({namespacing : 0});
/*
 * GET home page.
 */
module.exports = function(app){
  /**
    * Map the URL '/' to the callback
    */
  app.get('/', function(req, res){
    logger.log('Serving request for url [GET]' + req.route.path)
    db.query('select * from entries', function(err, results, fields){
      console.log(results);
      res.render('prodLaunch', { title: 'catalog Dashboard' })
    }); 
  });

  /**
    * Map the URL '/login' to the callback
    */
  app.get('/show/:id', function(req, res){
    logger.log('Serving request for url [GET] ' + req.route.path);
  });
  
  app.post('/form/submit', function(req, res){
    logger.log('Serving request for url [POST] ' + req.route.path);
  });
};
