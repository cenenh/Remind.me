// config/passport.js
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('./auth');

module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
      done(err, user);
    });

    passport.use(new GoogleStrategy({
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
    },
    function(token, refreshToken, profile, done) {
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {
          console.log(profile);
        });
    }));
};
