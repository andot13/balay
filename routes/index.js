var express = require('express');
var router = express.Router();
var passport = require('passport');
var Properties = require('../models/Property');
var User  = require('../models/User');

/* GET home page. */
router.get('/', function(req, res) {
  Properties.find({"area": "Bangkal"},function(error, data){
    if (error) {
      res.send(error);
    } else{
      res.render('index', { 
        prop: data
      });
    }
  });
});

router.get('/signup', function(req, res) {
  res.render('signup', {
    title: 'Signup'
  });
});

router.post('/signup', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var confirmPassword = req.body.confirm-password;

  //Form validation
  req.checkBody('username', 'username is required').notEmpty();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('confirm-password', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if(errors){
    res.render('signup', {
      errors: errors,
      username: username,
      password: password
    });
  } else {

    // Create a new user
    User.register(new User({ username: username}), password, function(error, user){
      if (error) {
        req.flash('info', 'Username is already taken');
        return res.render('signup', {
        });
      }

      passport.authenticate('local')(req, res, function(){
        req.flash('success', 'You are now registered');
        res.redirect('/dashboard');
      });
    });
  }
});

router.get('/login', function(req, res){
  res.render('login', {
    title: 'Login'
  });
});


router.get('/logout', function(req, res) {
  res.redirect('/');
});

router.get('/dashboard', function(req, res) {
  res.render('dashboard', {
    title: 'Dashboard'
  });
});

module.exports = router;
