var express = require('express');
var async = require('async');
var router = express.Router();
var connection = require('../../lib/connection');

router.get('/user', function(req, res){
  async.waterfall([
    function(callback){
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      var query = connection.query('SELECT * FROM user', function(query_error, query_result){
        connection.release();
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      }); //connection.query();
    }
  ], function(err, result){
    res.json(result);
  });
});

router.get('/list', function(req, res){
  async.waterfall([
    function(callback){
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      var query = connection.query('SELECT * FROM remind_list', function(query_error, query_result){
        connection.release();
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      }); //connection.query();
    }
  ], function(err, result){
    res.json(result);
  });
});

module.exports = router;
