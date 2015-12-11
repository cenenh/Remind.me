var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');

//for auth
var flogin = require('./routes/fb_login_jade');
var facebook_web_login = require('./routes/facebook_web_login');
var facebook_login = require('./routes/login/facebook_login');
var google_login = require('./routes/login/google_login');

//for REST API
var user = require('./routes/User');
var routes = require('./routes/index');
var users = require('./routes/users');
var ping = require('./routes/ping');
var remind = require('./routes/remind/Remind');


//for TEST API
var test_api = require('./routes/test_api');
var echo = require('./routes/test/echo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//basic routes
app.use('/', routes);
app.use('/users', users);

//for REST API
app.use('/api', ping);
app.use('/api/remind', remind);
app.use('/user', user);

//for facebook-login using web
app.use('/auth/flogin', flogin);
app.use('/auth/facebook_web', facebook_web_login);
app.use('/auth/facebook_web/callback', facebook_web_login);
app.use('/auth/facebook_web/login_success', facebook_web_login);
app.use('/auth/facebook_web/login_fail', facebook_web_login);

//for Facebook-login using Android
app.use('/auth/facebook_login/token', facebook_login);

//for Google-login using Android
app.use('/auth/google_login/token', google_login);

//for test_api
app.use('/testapi', test_api);
app.use('/test/echo',echo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
