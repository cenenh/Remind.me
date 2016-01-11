/**
 * Created by eunho on 2016-01-11.
 */
var express = require('express');
//var Places = require('../app/Controller/Places');
var jwt = require('../app/Controller/Jwt');
var router = express.Router();

router.use('/', jwt.isAuthenticated, function(req, res, next){
  req.middleware = 2;
  console.log(req.user);
  next();
});

router.post('/', function(req, res){
  res.json('hi!');
});

module.exports = router;
