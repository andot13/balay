var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function() {

  passport.use(new GoogleStrategy({
      clientID: '1071203922603-osb76t6lb92mb2fs1t68ug3iq34i5g0q.apps.googleusercontent.com',
      clientSecret: 'jOgRuFfotdPqNsJ9vApYO4aM',
      callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      var user = {};

      user.email = profile.emails[0].value;
      user.image = profile._json.image.url;
      user.displayName = profile._json.displayName;

      user.google = {};
      user.google.id = profile.id;
      user.google.token = accessToken;

      done(null, user);
    }
  ));

};

