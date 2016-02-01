var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.get('/', function(req, res, next) {
  res.render('dashboard', {
    user: {
      name: req.user.displayName,
      image: req.user._json.image.url
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
