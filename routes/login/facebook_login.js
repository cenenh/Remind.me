var express = require('express');
var session = require('express-session');
var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');
var configAuth = require('../../config/auth');
var User = require('../../app/Model/User');
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

router.post('/', function(req, res){
	passport.authenticate('facebook-token', function(err, user, info){
		if(err || !user){
			res.json({
				code : 401,
				data : 'Invalid Access Token'
			});
		}
		else{ //issue : send invalid token when the error occurs in this else part...
			user = JSON.stringify(user);
      //status code 307 -> redirect to POST method.
			res.redirect(307, '/user/'+encodeURIComponent(user));
		}
	})(req, res);
});

module.exports = router;
