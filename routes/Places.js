/**
 * Created by eunho on 2016-01-11.
 */
var express = require('express');
//var Places = require('../app/Controller/Places');
var jwt = require('../app/Controller/Jwt');
var places = require('../app/Controller/Places');
var remind = require('../app/Controller/Remind');
var router = express.Router();

router.use('/search', jwt.isAuthenticated, remind.getRemindWithPlaces);

router.post('/search', places.search);

/*router.post('/search', function(req, res){
  var response = {};
  response.email = req.user.email;
  res.json(response);
});*/

router.post('/test', function(req, res){
  var response = {};
  response.code = 200;
  results = [];
  var a = {
    id : 1,
    lat : 37.55500577,
    lng : 126.97367191
  };
  var b = { id : 2, lat : 37.55447843, lng : 126.97528124 };
  var c = { id : 3, lat : 37.55211385, lng : 126.97528124 };
  var d = { id : 4, lat : 37.55134833, lng : 126.97229862 };
  results.push(a);
  results.push(b);
  results.push(c);
  results.push(d);
  response.results = results;
  res.json(response);
});

module.exports = router;
