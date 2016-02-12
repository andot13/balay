var express = require('express');
var passport = require('passport');
var Properties = require('../../models/Property');
var User  = require('../../models/User');
var Area = require('../../models/Area');
var router = express.Router();


router.route('/')
  .get(function(req, res) {
    var query = {};

    Properties.find(query, function(err, properties){
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(properties);
      }
    });
  })
  .post(function(req, res){
    var property = new Properties();

    property.name = req.body.name;
    property.bedroom = req.body.bedroom;
    property.shower = req.body.shower;
    property.posted_by = req.body.posted_by;
    property.area= req.body.area;

    property.save( function(err, prop){
      if (err) {
        res.send(err);
      }

      Area.findOneAndUpdate(
        {"_id": property.area}, 
        {"$addToSet" : {properties: prop._id}}, 
        function(error, area){
          req.flash('success', 'Property created');
          res.redirect('/account');
        }
      );
    });

  });

// Middleware to handle findById. id fetched from url
router.use('/:propertyId', function(req, res, next){

  Properties.findById(req.params.propertyId, function(err, property){
    if (err) {
      res.status(500).send(err);
    } else if(property){
      req.property = property;
      next();
    } else {
      res.status(404).send('No property found');
    }
  });

});

router.route('/:propertyId')
  .get(function(req, res){

    // If property is found, return json
    res.json(req.property);

  })
  .put(function(req, res){
    req.property.name    = req.body.name;
    req.property.bedroom = req.body.bedroom;
    req.property.shower  = req.body.shower;
    req.property.area    = req.body.area;
    req.property.comments = [];

    req.property.save( function(err){
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(req.property);
      }
    });
  })
  .patch(function (req, res){

    if( req.body._id) {
      delete req.body._id;
    }

    for(var a in req.body){
      req.property[a] = req.body[a];
    }

    req.property.save( function(err){
      if (err){
        res.status(500).send(err);
      } else {
        res.json(req.property);
      }
    });
  })
  .delete(function (req, res){
    req.property.remove( function(err){
      if (err){
        res.status(500).send(err);
      } else {
        res.status(204).send('Removed');
      }
    });
  });


module.exports = router;
