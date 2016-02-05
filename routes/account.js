var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Properties = require('../models/Property');

router.use('/', function(req, res, next) { 
  if(!req.user) {
    res.redirect('/');
  }
  next();
});

router.get('/', function(req, res) {
  Properties.find({'posted_by': req.user._id}, function(err, props){
    if(err){
      res.send(err);
    }

    res.render('dashboard', {
      user: {
        userId: req.user._id,
        name: req.user.displayName, 
        properties: props,
        image: req.user.image,
        email: req.user.email
      }
    });
  });
});

router.get('/properties/add', function(req, res, next) {
  var user = User.find({id: req.user}, function(err, user){
    if(err) {
      throw err;
    }
  });

  res.render('account-property-add', {
    user: user
  });
});

module.exports = router;
