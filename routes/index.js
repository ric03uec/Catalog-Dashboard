'use strict'

var util = require('util');
var Logger = require('devnull');
var Moment = require('moment');
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
      res.render('newSku', { title: 'catalog Dashboard' });
    }); 
  });

  /**
    * Map the URL '/login' to the callback
    */
  app.get('/show/:id', function(req, res){
    logger.log('Serving request for url [GET] ' + req.route.path);
  });
  
  app.post('/form/newSku', function(req, res){
    logger.log('serving request for url [post] ' + req.route.path);
    console.log(req.body);

    var queryStr = 'insert into entries set' + 
      'stock_arrival_date = "' +req.body.stockArrivalDate+ '" and ' +
                  'brands = "' + req.body.brands + '" and ' +
                  'sheet_no = ' + req.body.sheetNo;
    console.log(queryStr);
    db.query(queryStr, function(err, results){
      console.log(results);
      res.json({
        'retStatus' : 'success'  
      });  
    });
    
  });
  
  app.get('/dashboard', function(req, res){
    logger.log('serving request for url [GET] ' + req.route.path);
    res.render('dashboard', { title : 'catalog Dashboard' });
  });

};
