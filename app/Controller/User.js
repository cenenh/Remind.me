var User = require('../Model/User');
var _ = require('underscore');
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
  
  if(_.isEmpty(req.params)){ //sign-up using email
	newUser.name = req.body.name;
	newUser.password = req.body.password;
	newUser.email = req.body.email;
	console.log(newUser);
  }
  else{	//sign-up using Facebook or Google
	var req_data = JSON.parse(req.params.user);
	newUser.name = req_data.name;
	newUser.password = req_data.password;
	newUser.email = req_data.email;
  }
	
  newUser.addUser(newUser, function(error, result){
    if(error){
      response.code = 400;
      response.data = "addUser Fail";
      if(error.errno === 1062){
        response.reason = "duplicate-mail";
      }
    }
    else{
      response.code = 200;
      response.data = "addUser OK";
    }
    res.json(response);
  });
  delete newUser;
};

