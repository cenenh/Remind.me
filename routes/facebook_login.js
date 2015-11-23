var express = require('express');
var router = express.Router();
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('../config/auth');

router.use(session({
  secret: 'remind.me',
  resave: false,
  saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  //console.log('serialize');
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  //console.log('deserialize');
  done(null, user);
});

passport.use(new FacebookStrategy({
  clientID: configAuth.facebookAuth.clientID,
  clientSecret: configAuth.facebookAuth.clientSecret,
  callbackURL: configAuth.facebookAuth.callbackURL,
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

router.get('/',
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
);

router.get('/callback',
  passport.authenticate('facebook', {
    successRedirect: '/auth/facebook/login_success',
    failureRedirect: '/auth/facebook/login_fail'
  }
));

router.get('/login_success', ensureAuthenticated, function(req, res){
  console.log(req.user._json.id);
  console.log(req.user._json.name);
  res.send(req.user);
});

function ensureAuthenticated(req, res, next) {
    // 로그인이 되어 있으면, 다음 파이프라인으로 진행
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
}

module.exports = router;
