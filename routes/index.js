'use strict'

var util = require('util');
var logger = require('devnull');
var db = require('../models/db');
var logger = new logger({namespacing : 0});

var dashboard = require('./dashboard');
var newSku = require('./newSku');
var contentAssign = require('./contentAssign');
var contentComplete = require('./contentComplete');
var photoUpdate = require('./photoUpdate');
var editUpdate = require('./editUpdate');
var imgApproval = require('./imgApproval');
var prodLaunch = require('./prodLaunch');
var main = require('./main');
/*
 * GET home page.
 */
module.exports = function(app){
  /**
    * Map the URL '/' to the callback
    */
  app.get('/', function(req, res){
    logger.log('Serving request for url [GET]' + req.route.path);
    res.render('newSku', { title :'catalog Dashboard', 
                            formName : 'Content Receipt'});
  });

  app.get('/dashboard', dashboard.show);
  app.post('/form/newSku', newSku.save);

  app.get('/form/contentAssign/:id', contentAssign.show); 
  app.post('/form/contentAssign', contentAssign.save);

  app.get('/form/contentComplete/:id', contentComplete.show); 
  app.post('/form/contentComplete', contentComplete.save);

  app.get('/form/photoUpdate/:id', photoUpdate.show);
  app.post('/form/photoUpdate', photoUpdate.save);

  app.get('/form/editUpdate/:id', editUpdate.show);
  app.post('/form/editUpdate', editUpdate.save);

  app.get('/form/imageApproval/:id', imgApproval.show);
  app.post('/form/imageApproval', imgApproval.save);

  app.get('/form/prodLaunch/:id', prodLaunch.show);
  app.post('/form/prodLaunch', prodLaunch.save);

  app.get('/form/complete/:id', main.show); 
};
