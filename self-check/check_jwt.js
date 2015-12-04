var jwt = require('jsonwebtoken');
var jwt_config = require('../config/jwt');

var first_data = {
  email : 'brown0831@nate.com',
  name : 'Choi Eun Ho',
  password : '1q1q2w2w3e3e4r4r'
};

var data = {
  email : 'cenenh@naver.com',
  name : 'Choi Eun Ho',
  password : '1q2w3e4r'
};

jwt.sign(first_data, jwt_config.secret, {expiresIn : 10}, function(done){
  console.log(done);
  first_token = done;
  jwt.verify(first_token, jwt_config.secret, {}, function(err, decoded){
    console.log(decoded);
  });
});

var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImNlbmVuaEBuYXZlci5jb20iLCJuYW1lIjoiQ2hvaSBFdW4gSG8iLCJwYXNzd29yZCI6IjFxMnczZTRyIiwiaWF0IjoxNDQ5MTYwNTI3fQ.A9FBLcp0rskF0t3-1jlvKWbjbLU0noAGaIOBhoVxCK4";
jwt.verify(token, jwt_config.secret, {}, function(err, decoded){
  console.log(decoded);
  console.log(decoded.email);
});

console.log(jwt_config.options);
