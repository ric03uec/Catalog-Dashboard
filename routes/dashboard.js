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

      var completeArr = [];
      var incompleteArr = [];
      var fullList= [];

      for(var i = 0 ; i < allEntries.length ;i++){
        if(allEntries[i]['launch_complete'] === 1){
          completeArr.push(allEntries[i]);
        }else if(allEntries[i]['launch_complete'] === 0){
          incompleteArr.push(allEntries[i]);
        }
      }
      for(var i = 0 ; i < completeArr.length ;i++){
        incompleteArr.push(completeArr[i]);
      }
      console.log(incompleteArr);
      res.render('dashboard', 
                {'title' : 'catalog Dashboard',
                 'formType' : 'all',
                 'allEntries' : incompleteArr});
    }
  });
};

module.exports = dashboard;
