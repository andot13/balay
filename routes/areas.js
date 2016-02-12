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


router.get('/:area_id', function(req, res, next) {
  var areaId = req.params.area_id;
  
  Areas.findOne({_id: areaId}) 
    .populate('properties') 
    .exec(function(error, props){
      if (error)
        res.send(error);
      res.render('areas', { 
        area: props,
        title: 'Express'
      });
    });
  //
  // Areas.findOne({ _id: areaId }, function(error, data){
  //   if (error)
  //     res.send(error);
  //   res.render('areas', { 
  //     area: data,
  //     title: 'Express'
  //   });
  // });
});

module.exports = router;
