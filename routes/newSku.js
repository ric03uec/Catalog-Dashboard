'use strict'

var util = require('util');
var logger = require('devnull');
var Moment = require('moment');
var db = require('../models/db');
var logger = new logger({namespacing : 0});
var catalog = require('../models/catalog');

var newSku = {};

newSku.save = function(req, res){
  logger.log('serving request for url [post] ' + req.route.path);

  var stockArrivalDate = req.body.stockArrivalDate;
  stockArrivalDate = Moment(stockArrivalDate,"DD/MM/YYYY").format('YYYY-MM-DD');
  var queryStr = 'insert into entries(stock_arrival_date, brands, sheet_no, no_of_sku) ' +
       ' values ("' + stockArrivalDate + '", "' + req.body.brands + '" , ' +req.body.sheetNo+ ',' + req.body.noOfSku + ');';

  db.query(queryStr, function(err, results){
    if(!err && results){
      catalog.getAll(function(errAll, allEntries){
        if(!errAll && allEntries){
          res.render('dashboard', 
                {'title' : 'catalog Dashboard',
                 'formType' : 1,
                 'formId' : results.insertId,
                 'allEntries' : allEntries});
        }else{
          logger.error('All entries could not be fetched' + errAll);
        }
      });
    }else{
      logger.error('Error inserting form 1 in db' + err);
    }
  }); 
};

module.exports = newSku;
