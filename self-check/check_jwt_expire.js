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
  //setTimeout 단위는 ms, 1000 = 1초
  setTimeout(
    function(){
      console.log("gonna verify token")
      jwt.verify(first_token, jwt_config.secret, {}, function(err, decoded){
        if(err){
          console.log("error!");
          console.log(err);
          /*
            { [TokenExpiredError: jwt expired]
              name: 'TokenExpiredError',
              message: 'jwt expired',
              expiredAt: Fri Dec 04 2015 12:40:33 GMT+0900 (대한민국 표준시)
            }
            TokenExpiredError
            or
            JsonWebTokenError
          */
          console.log(err.name);
        }
        else{
          console.log("DECODE!!!!!!")
          console.log(decoded);
        }
      });
    },
    11000);
});
