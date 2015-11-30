var sec = "remind.me";
var jwt = require('jsonwebtoken');
var token = jwt.sign({ name: 'choieunho' }, sec);
console.log(token);

jwt.verify(token, sec, function(err, decoded) {
  if(err){
    console.log(err);
  }
  else{
    console.log(decoded.name);
  }
});
