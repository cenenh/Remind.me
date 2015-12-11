var express = require('express');
var session = require('express-session');
var passport = require('passport');
//var GoogleTokenStrategy = require('passport-google-token').Strategy;
//var GoogleTokenStrategy = require('passport-google-id-token');
var GooglePlusTokenStrategy = require('passport-google-plus-token');
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

/*passport.use(new GoogleTokenStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret
  },
  function(accessToken, refreshToken, profile, done) {
    var user = profile;
    done(null, user);
  }
));*/

passport.use(new GooglePlusTokenStrategy({
  clientID: configAuth.googleAuth.clientID,
  clientSecret: configAuth.googleAuth.clientSecret,
  },
  function(req, accessToken, refreshToken, profile, next) {
    var user = {};
    user.profile = profile;
    console.log(user);
    console.log(user.profile);
    return next(null, user);
  }
));

router.get('/', passport.authenticate('google-plus-token'));

router.post('/', function(req, res){
  console.log("google login is called!");
	passport.authenticate('google-plus-token', function(err, user, info){
    console.log(user);
    console.log(info);
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
