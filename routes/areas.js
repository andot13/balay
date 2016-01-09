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
