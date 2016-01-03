/**
 * Created by eunho on 2015-12-05.
 */
var connection = require('../../lib/connection');
var async = require('async');

//Constructor
function Remind(params) {
  this.data = params;
};

//Class Method
//for test
Remind.prototype.print = function(){
  console.log(this.data);
};

Remind.prototype.addRemind = function(callback) {
  var data = this.data;
  async.waterfall([
    function(callback){
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      var query = connection.query('INSERT INTO remind_list SET ?', data, function(query_error, query_result){
        connection.release();
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      }); //connection.query();
    }
  ],
  function(async_waterfall_error, addRemind_result){
    //async_waterfall_error : The error from callback
    callback(async_waterfall_error, addRemind_result);
  });
};

Remind.prototype.changeBuyComplete = function(callback) {
  var data = this.data;
  async.waterfall([
    function(callback){
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      var query = connection.query('UPDATE remind_list SET buy_complete = !buy_complete where remind_index = ? ',
       data.index, function(query_error, query_result){
        connection.release();
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      }); //connection.query();
    }//function(connection, callback)
  ],
  function(async_waterfall_error, changeBuyComplete_result){
    callback(async_waterfall_error, changeBuyComplete_result);
  });
};

Remind.prototype.changeAlarm = function(callback){
  var data = this.data;
  async.waterfall([
    function(callback){
        connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      var query = connection.query('UPDATE remind_list SET remind_alarm = !remind_alarm where remind_index = ? ',
       data.index, function(query_error, query_result){
        connection.release();
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      }); //connection.query();
    }//function(connection, callback)
  ],
  function(async_waterfall_error, changeAlarm_result){
    callback(async_waterfall_error, changeAlarm_result);
  });
};

Remind.prototype.deleteRemind = function(callback){
  //var remindDAO = new Remind(params);
  var data = this.data;
  async.waterfall([
    function(callback){
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      var query = connection.query('DELETE FROM remind_list where remind_index = ?',
       data.index, function(query_error, query_result){
        connection.release();
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      });
    }
  ],
  function(async_waterfall_error, deleteRemind_result){
    callback(async_waterfall_error, deleteRemind_result);
  });
};

Remind.prototype.getMyRemind = function(callback){
  var data = this.data;
  async.waterfall([
    function(callback){
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      var query = connection.query('SELECT company,category,detail_info,date,img_link FROM remind_list where email = ?',
       data.email, function(query_error, query_result){
        connection.release();
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      });
    }
  ],
  function(async_waterfall_error, deleteRemind_result){
    callback(async_waterfall_error, deleteRemind_result);
  });
};

module.exports = Remind;
