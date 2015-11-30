var User = require('../Model/User');
var async = require('async');

module.exports.getAll = function(req, res){
  console.log("request method : " + req.method);
  console.log("user.getAll() is called!");
  var myUser = new User();
  myUser.getAll(function (result){
    //console.log(result);
    res.json(result);
  });
  //console.log("delete myUser for memory-management!");
  delete myUser;
};

module.exports.addUser = function(req, res){

  console.log("request method : " + req.method);
  console.log("user.addUser() is called!");

  var response = {};
  var newUser = new User();

  newUser.name = req.body.name;
  newUser.password = req.body.password;
  newUser.email = req.body.email;
  console.log(newUser);

  newUser.addUser(newUser, function(error, result){
    if(error){
      response.code = 400;
      response.data = "addUser Fail";
      if(error.errno === 1062){
        response.reason = "duplicate e-mail";
      }
    }
    else{
      response.code = 200;
      response.data = "addUser OK";
    }
    res.json(response);
  });
};
