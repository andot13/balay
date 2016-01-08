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

  area = Areas.findOne(areaId, function(error, data){
    if (error)
      res.send(error);
    
    propertyIds = area.map(function(prop) {
      return prop.id;
    });

    areaProperties = Properties.find({
      _id: { $in: propertyIds }
    }).toArray();
  });
 });



//   var areaId = req.params.area_id;
//   Areas.findOne(areaId, function(error, data){
//     if (error)
//       res.send(error);
//     res.render('areas', { 
//       area: data,
//       title: 'Express'
//     });
//   });
// });

module.exports = router;
