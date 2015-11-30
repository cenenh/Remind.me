var express = require('express');
var session = require('express-session');
var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');
var configAuth = require('../config/auth');
var router = express.Router();

router.use(session({
  secret: 'remind.me',
  resave: false,
  saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

passport.use(new FacebookTokenStrategy({
  clientID: configAuth.facebookAuth.clientID,
  clientSecret: configAuth.facebookAuth.clientSecret
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    done(null, profile);
  }
));

router.post('/', passport.authenticate('facebook-token'), function(req, res){
	console.log("POST!");
	res.status(200);
	res.json(req.user);
});

router.get('/:access_token', passport.authenticate('facebook-token'), function(req, res){
	console.log(req);
	console.log(profile);
	res.send("hi!");
});

module.exports = router;
