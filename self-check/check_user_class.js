var User = require('../app/Model/User');

req = {
  name: "choi eun ho",
  email: "gseunwo@gmail.com",
  password: "my password"
};

var new_req_user = new User(req);
console.log(new_req_user);
//{ name: 'choi eun ho', email: 'gseunwo@gmail.com' }
