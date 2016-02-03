var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models/User');

module.exports = function() {

  passport.use(new GoogleStrategy({
      clientID: '1071203922603-osb76t6lb92mb2fs1t68ug3iq34i5g0q.apps.googleusercontent.com',
      clientSecret: 'jOgRuFfotdPqNsJ9vApYO4aM',
      callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        var user = {};
        var query = {
          'google.id': profile.id
        };

        User.findOne(query, function(err, user){
          if(err) {
            return done(err);
          }

          if(user) {
            //If user found, log them in
            done(null, user);

          } else {
            // create new user
            var user = new User;

            user.email = profile.emails[0].value;
            user.image = profile._json.image.url;
            user.displayName = profile._json.displayName;

            user.google = {};
            user.google.id = profile.id;
            user.google.token = accessToken;

            user.save(function(err) {
              if(err) {
                throw err;
              }
              return done(null, user);
            });
          }
        });
      });
    }
  ));

};

