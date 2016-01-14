var express = require('express');
var passport = require('passport');
var Properties = require('../../models/Property');
var User  = require('../../models/User');
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
    var property = new Properties(req.body);

    property.save( function(err){
      if (err) {
        res.send(err);
      }
      res.status(201).send(property);

    });

  });

router.route('/:propertyId')
  .get(function(req, res){
    var propertyId = req.params.propertyId;

    Properties.findById(propertyId, function(err, properties){
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(properties);
      }
    });
  });



module.exports = router;
