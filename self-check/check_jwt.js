var jwt = require('jsonwebtoken');
var jwt_config = require('../config/jwt');
console.log(jwt_config.secret);
var data = {
  email : 'cenenh@naver.com',
  name : 'Choi Eun Ho',
  password : '1q2w3e4r'
}

jwt.sign(data, jwt_config.secret, {}, function(done){
  console.log(done);
});

var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImNlbmVuaEBuYXZlci5jb20iLCJuYW1lIjoiQ2hvaSBFdW4gSG8iLCJwYXNzd29yZCI6IjFxMnczZTRyIiwiaWF0IjoxNDQ5MTYwNTI3fQ.A9FBLcp0rskF0t3-1jlvKWbjbLU0noAGaIOBhoVxCK4";
jwt.verify(token, jwt_config.secret, {}, function(err, decoded){
  console.log(decoded);
  console.log(decoded.email);
});
