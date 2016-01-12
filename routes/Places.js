/**
 * Created by eunho on 2016-01-11.
 */
var express = require('express');
//var Places = require('../app/Controller/Places');
var jwt = require('../app/Controller/Jwt');
var router = express.Router();

router.use('/search', jwt.isAuthenticated, function(req, res, next){
  req.middleware = 2;
  console.log(req.user);
  next();
});

router.post('/test', function(req, res){
  var response = {};
  response.code = 200;
  response.latitude = req.body.latitude;
  response.longtitude = req.body.longtitude;
  res.json(response);
});

module.exports = router;
