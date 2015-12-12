var jwt_config = require('../../config/jwt');
var jwt = require('jsonwebtoken');

//Constructor
function Jwt() {

};

// class methods
Jwt.prototype.isAuthenticated = function(access_token, callback) {
  jwt.verify(access_token, jwt_config.secret, {}, function(err, decode){
    var result = {};
    if(err){ //verify error
      result.code = 401;
      result.data = err.name;
    }
    else{ // No error
      result.code = 200;
      result.data = 'OK';
      result.user = decode;
    }
    //console.log("result in Jwt.Model.isAuthenticated()");
    //console.log(result);
    callback(result);
  });
};

// export the class
module.exports = Jwt;
