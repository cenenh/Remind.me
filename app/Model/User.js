var connection = require('../../lib/connection');
var async = require('async');
//Constructor

function User() {
  this.name = "";
  this.email = "";
  this.password = "";
};

// class methods
User.prototype.getAll = function(callback) {
  console.log('it is getAll() in model.user.js');
  async.waterfall([
    function(callback){
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      connection.query("SELECT * FROM user;", function(query_error, user_list){
        if(!query_error){
          console.log("release connection!")
          connection.release();
          console.log(user_list);
          callback(null, user_list);
        }
        else{
          callback(JSON.parse(JSON.stringify(err)), user_list);
        }
      });
    }
  ],
  function(err, user_list){
    console.log("get result in model.user.js : " + user_list);
    callback(user_list);
  });
};

User.prototype.addUser = function(newUser, callback){
  console.log('it is addUser() in model.user.js');
  console.log("parameter : " + JSON.stringify(newUser));
  async.waterfall([
    function(callback){
      console.log("get connection in Model.User.addUser!")
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      connection.query('INSERT INTO user SET ?', newUser, function(query_error, query_result){
        console.log("release connection!")
        connection.release();
		if(query_error){
			console.log("query error : " + query_error);
		}
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      }); //connection.query();
    }
  ],
  function(async_waterfall_error, adduser_result){
    //async_waterfall_error : The error from callback
    callback(async_waterfall_error, adduser_result);
  });
};

// export the class
module.exports = User;
