var express = require('express');
var jwt = require('jsonwebtoken');
var jwt_config = require('../config/jwt');
var router = express.Router();

//localhost:8080/testapi/
router.use('/', function(req, res, next){
  console.log(req.body);
  if(req.body.access_token){
    jwt.verify(req.body.access_token, jwt_config.secret, {}, function(err,decode){
      if(err){ //verify error
        if(err.name === jwt_config.error.TokenExpiredError){
          res.json({
            code : 401,
            data : 'TokenExpiredError'
          });
        }
        else if(err.name === jwt_config.error.JsonWebTokenError){
          res.json({
            code : 404,
            data : 'JsonWebTokenError'
          });
        }
      } //verify error
      else{ // No error
        next();
      }
    });
  }
  else{
    var response = {
      code : 404,
      data : "access_token_not_found"
    };
    res.json(response);
  }
});

router.use('/header', function(req, res, next){
  console.log(req.headers.authorization);
  next();
});

router.post('/header', function(req, res){
  res.json({
    code : 200,
    data : 'OK'
  });
});

router.get('/header', function(req, res){
  res.json({
    code : 200,
    data : 'OK'
  });
});


router.post('/', function(req, res){
  res.json({
    code : 200,
    data : "OK"
  });
});

module.exports = router;
