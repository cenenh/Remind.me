/**
 * Created by eunho on 2015-12-05.
 */

//Model of Remind.

var connection = require('../../lib/connection');
var async = require('async');

//Constructor
function Remind(params) {
  this.data = params;
};

Remind.prototype.addRemind = function(callback) {
  var data = this.data;
  async.waterfall([
    function(callback){
      console.log("get connection in Model.Remind.addRemind!")
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      var query = connection.query('INSERT INTO remind_list SET ?', data, function(query_error, query_result){
        connection.release();
        if(query_error){
          console.log("query error! in model of remind");
          console.log("query error : " + query_error);
        }
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      }); //connection.query();
    }
  ],
  function(async_waterfall_error, addRemind_result){
    //async_waterfall_error : The error from callback
    callback(async_waterfall_error, addRemind_result);
  });
};

// class methods
Remind.prototype.getAll = function(callback) {

};

//for test
Remind.prototype.print = function(){
  console.log(this.data);
};

module.exports = Remind;
