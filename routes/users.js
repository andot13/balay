var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.get('/', function(req, res, next) {
  User.find(function(error, users){
    if (error)
      res.send(error);
    res.render('users', {
      users: users
    });
  });

});

module.exports = router;
