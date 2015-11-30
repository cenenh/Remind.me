var express = require('express');
var session = require('express-session');
var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');
var configAuth = require('../config/auth');
var User = require('../app/Controller/User');
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
    var user = {
      email : profile.emails[0].value,
      name : profile.name.familyName + profile.name.givenName,
      password : profile.id
    }
    done(null, user);
  }
));

router.put('/', passport.authenticate('facebook-token',{
  successRedirect : '/auth/facebook_login/token/success',
  failureRedirect : '/auth/facebook_login/token/fail',
  failureFlash : true
}, { failureFlash: 'Invalid username or password.' }));

//router.put('/success', User.addUser);

router.put('/success', function(req, res){
  res.json({
    code : 200,
    data : req.user
  });
});

router.put('/fail', function(req, res){
  res.json({
    code : 401,
    data : "Invalid Token"
  });
});

router.post('/', passport.authenticate('facebook-token'), function(req, res){
	//console.log("POST!");
	res.status(200);
	res.json(req.user);
});

router.get('/:access_token', passport.authenticate('facebook-token'), function(req, res){
	//console.log(req);
	console.log(profile);
	res.send("hi!");
});

module.exports = router;
