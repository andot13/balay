var express = require('express');
var router = express.Router();
var Properties = require('../models/Property');

router.get('/', function(req, res, next) {
  Properties.find(function(error, data){
    if (error)
      res.send(error);
    res.render('properties', { 
      properties: data,
      title: 'express'
    });
  });
});

// router.get('/new', function(req, res, next) {
//     res.render('dashboard', { 
//       title: 'express'
//     });
// });



router.get('/:property_id', function(req, res, next) {

  var reqId = req.params.property_id;
  var allProperties;

  Properties.find(function(error, data){
    if (error)
      res.send(err);
    relatedProperties = data;
  });

  Properties.findById(reqId, function(error, data){
    if (error)
      res.send(error);
    res.render('property', { 
      singleProperty: data,
      properties: relatedProperties,
      title: 'Express'
    });
  });
});


module.exports = router;
