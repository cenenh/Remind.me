var request = require('request');
var googleMap = require('../config/googleMap');
var _ = require('underscore');
var async = require('async');

function getPlaces(url, qs, callback){
  request({url: url, qs: qs }, function(err, response, body){
      console.log(JSON.parse(body));
      if(!err){
        callback(null, JSON.parse(body));
      }
      else{
        callback(err,null);
      }
  });
}

function set_next_token(token) {
  if(_.isUndefined(token)){
    return false;
  }
  return true;
}

var request_params = {};
_.extend(request_params, googleMap.params);
request_params.location = "37.5533,126.974";
request_params.name = "GS25";
var final_result = [];
//getPlaces(googleMap.url, request_params);
async.waterfall([
  function(callback){
    getPlaces(googleMap.url, request_params, function(err, result){
      if(!err && result !== null){
        callback(null, result);
      }
      else{
        callback(err, null);
      }
    });
  },
  function(result, callback){
    // whilst(test, fn, callback)
    // Repeatedly call fn, while test returns true. Calls callback when stopped, or an error occurs.
    final_result.push(result);
    var if_next_token = set_next_token(result.next_page_token);
    request_params.pagetoken = result.next_page_token;

    async.whilst(
      function(){
        return if_next_token;
      }, // check if more next_page_token
      function(callback){
        //1초 후에 보내야함.
        console.log(request_params);
        setTimeout(function() {
          getPlaces(googleMap.url, request_params, function(err, new_result){
            if(!err && new_result !== null){
              final_result.push(new_result);
              if_next_token = set_next_token(new_result.next_page_token);
              request_params.pagetoken = null;
              request_params.pagetoken = new_result.next_page_token;
              callback(null, new_result);
            }
            else{
              console.log("err!");
              callback(err, null);
            }
          }); //getPlaces
        }, 1500);
      },
      function(err, n){
        console.log("the end!")
        callback(err, final_result);
      }
    ); //async.whilst
  }
],
function(err, result){
  if(!err){
    //console.log(result);
  }
});
