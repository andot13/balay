var express = require('express');
var router = express.Router();
var Areas = require('../models/Area');
var Properties = require('../models/Property');

router.get('/', function(req, res, next) {
  Areas.find(function(error, data){
    if (error)
      res.send(error);
    res.render('areas', { 
      areas: data,
      title: 'Express'
    });
  });
});


router.get('/:areaName', function(req, res, next) {
  var areaName = req.params.areaName;
  
  Areas.findOne({name: areaName}) 
    .populate('properties') 
    .exec(function(error, props){
      if (error)
        res.send(error);
      res.render('area', { 
        area: props,
        title: 'Express'
      });
    });
});

module.exports = router;
