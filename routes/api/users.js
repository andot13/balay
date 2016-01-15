var express = require('express');
var passport = require('passport');
var Properties = require('../../models/Property');
var Users  = require('../../models/User');
var router = express.Router();

// Get all users
router.route('/')
  .get(function(req, res) {
    var query = {};

    Users.find(query, function(err, users){
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(users);
      }
    });
  })
  .post(function(req, res){
    var user= new Users(req.body);

    user.save( function(err){
      if (err) {
        res.send(err);
      }
      res.status(201).send(user);

    });

  });

// Middleware to handle findById. id fetched from url
router.use('/:userId', function(req, res, next){

  Users.findById(req.params.userId, function(err, user){
    if (err) {
      res.status(500).send(err);
    } else if(user){
      req.user = user;
      next();
    } else {
      res.status(404).send('No user found');
    }
  });

});

router.route('/:userId')
  .get(function(req, res){

    // If user is found, return user details
    res.json(req.user);

  });

// Get User's Properties
router.route('/:userId/properties')
  .get(function(req, res){

    Properties.find({
      posted_by: req.user._id
    }, function(err, properties){
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(properties);
      }
    });
  });



router.route('/:userId')
  .get(function(req, res){

    // If property is found, return json
    res.json(req.user);

  });
module.exports = router;
