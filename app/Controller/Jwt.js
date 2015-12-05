var User = require('../Model/User');
var _ = require('underscore');
var async = require('async');
var jwt = require('../Model/Jwt');

module.exports.isAuthenticated = function(req, res, next){
  var routing_jwt = new jwt();
  if(req.body.access_tokens || req.headers.authorization){
    var access_token = req.body.access_token || req.headers.authorization;
    routing_jwt.isAuthenticated(access_token, function(result){
      if(result.code === 200){
        req.user = result.user;
        next();
      }
      else{
        res.json(result);
      }
    });
  }
  else{ // if !req.body.access_token
    res.json({
      code: 404,
      data: 'access_token_not_found'
    });
  } // if !req.body.access_token
};
