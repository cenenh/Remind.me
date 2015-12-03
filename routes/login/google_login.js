var express = require('express');
var session = require('express-session');
var passport = require('passport');
var GoogleTokenStrategy = require('passport-google-token').Strategy;
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

passport.use(new GoogleTokenStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    done(null, profile);
  }
));

router.post('/', function(req, res){
  console.log("google login is called!");
	passport.authenticate('google-token', function(err, user, info){
		if(err || !user){
			res.json({
				code : 401,
				data : 'Invalid Access Token'
			});
		}
		else{ //issue : send invalid token when the error occurs in this else part...
			user = JSON.stringify(user);
      //status code 307 -> redirect to POST method.
			//res.redirect(307, '/user/'+encodeURIComponent(user));
      res.send(user);
		}
	})(req, res);
});

module.exports = router;
