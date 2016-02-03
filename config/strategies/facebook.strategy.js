var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function() {
  passport.use(new FacebookStrategy({
    clientID: '1517323191895906',
    clientSecret: 'ae9f4ed343972036cdc87ae2f3510c9e',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['emails', 'displayName', 'name']
  },

  function(accessToken, refreshToken, profile, done) {
    var user = {};
    
    //
    user.email = profile.emails[0].value;
    // // user.displayName = profile._json.displayName;
    user.displayName = profile.displayName;
    //
    user.facebook = {};
    user.facebook.id = profile.id;
    user.facebook.token = accessToken;

    done(null, user);
  }
  ));

};

