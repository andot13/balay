var express = require('express');
var passport = require('passport');
var Properties = require('../models/Property');
var User  = require('../models/User');
var router = express.Router();

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
  if (req.isAuthenticated()){
    res.redirect('/dashboard');
  }

  res.render('signup', {
    title: 'Signup'
  });
});


// router.post('/signup', passport.authenticate('local-signup', {
//   successRedirect: '/dashboard',
//   failureRedirect: '/signup',
//   failureFlash: true
// }));


router.post('/signup', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  // var confirmPassword = req.body.confirm-password;
  //
  // //Form validation
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('email', 'valid email required').isEmail();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('password', '6 to 20 characters required').len(6, 20);
  // req.checkBody('confirm-password', 'Passwords do not match').equals(req.body.password);
  //
  var errors = req.validationErrors();
  //

  if(errors){
    res.render('signup', {
      errors: errors,
      email: email,
    });
  } else {
    passport.authenticate('local-signup', {
      successRedirect: '/dashboard',
      failureRedirect: '/signup',
      failureFlash: true
    })(req, res);
  }


});

router.get('/login', function(req, res){
  if (req.isAuthenticated()){
    res.redirect('/dashboard');
  }

  res.render('login', {
    title: 'Login'
  });
});

router.post('/login', function(req, res){
  var email = req.body.email;
  var password = req.body.password;
  // var confirmPassword = req.body.confirm-password;
  //
  // //Form validation
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('password', 'password is required').notEmpty();
  // req.checkBody('confirm-password', 'Passwords do not match').equals(req.body.password);
  //
  var errors = req.validationErrors();
  //

  if(errors){
    res.render('login', {
      errors: errors,
      email: email
    });
  } else {
    passport.authenticate('local-login', {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res);
  }
});


router.get('/logout', function(req, res) {
  if(req.isAuthenticated()){
    req.logout();
    req.flash('info', 'You are now logged out');
  }

  res.redirect('/login');
});

router.get('/dashboard', isLoggedIn ,function(req, res) {
  
  // Disable back button
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');

  res.render('dashboard', {
    title: 'Dashboard'
  });
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

module.exports = router;
