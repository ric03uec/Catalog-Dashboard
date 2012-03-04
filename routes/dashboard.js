'use strict'

var util = require('util');
var logger = require('devnull');
var moment = require('moment');
var logger = new logger({namespacing : 0});
var catalog = require('../models/catalog');

var dashboard = {};

dashboard.show = function(req, res){
  catalog.getAll(function(err, allEntries){
    if(!err && allEntries){
      res.render('dashboard', 
                {'title' : 'catalog Dashboard',
                 'formType' : 'all',
                 'allEntries' : allEntries});
    }
  });
};

module.exports = dashboard;
