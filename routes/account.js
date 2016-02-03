var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.use('/', function(req, res, next) { 
  if(!req.user) {
    res.redirect('/');
  }
  next();
});

router.get('/', function(req, res) {
  res.render('dashboard', {
    user: {
      name: req.user.displayName, 
      image: req.user.image,
      email: req.user.email
    }
  });
  // else {
  //   User.find(function(error, users){
  //     if (error)
  //       res.send(error);
  //     res.render('dashboard', {
  //       users: users
  //     });
  //   });
  // }
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
