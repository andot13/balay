var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/User');

module.exports = function() {

    passport.use(new FacebookStrategy({
      clientID: '1517323191895906',
      clientSecret: 'ae9f4ed343972036cdc87ae2f3510c9e',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['emails', 'displayName', 'name']
    },

    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function(){
        var user = {};
        var query = {
          'facebook.id': profile.id
        };

        User.findOne(query, function(err, user) {
          if(err) {
            return done(err);
          }

          if(user) {
            done(null, user);
          } else {
            var user = new User;

            user.email = profile.emails[0].value;
            user.displayName = profile.displayName;

            user.facebook = {};
            user.facebook.id = profile.id;
            user.facebook.token = accessToken;

            user.save(function(err){
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

