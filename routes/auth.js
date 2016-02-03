var express = require('express');
var passport = require('passport');
var router = express.Router();

router.route('/google/callback')
  .get(passport.authenticate('google', {
    successRedirect: '/account',
    failure: '/login'
}));


router.route('/google')
  .get(passport.authenticate('google', {
    scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
    ]
}));

router.route('/facebook/callback')
  .get(passport.authenticate('facebook', {
    successRedirect: '/account',
    failure: '/login'
}));

router.route('/facebook')
.get(passport.authenticate('facebook', {
  scope: ['email']
}));

module.exports = router;
