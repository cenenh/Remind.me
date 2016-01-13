/**
 * Created by eunho on 2016-01-11.
 */
var request = require('request');
var _ = require('underscore');
var googleMap = require('../../config/googleMap');
var connection = require('../../lib/connection');
var async = require('async');

//Constructor
function Places(params) {
  this.data = params;
};

Places.prototype.print = function(){
  console.log(this.data);
};

Places.prototype.getPlacesFromGoogle = function (url, qs, callback) {
  request({url: url, qs: qs }, function(err, response, body){
      //console.log(JSON.parse(body));
      if(!err){
        callback(null, JSON.parse(body));
      }
      else{
        callback(err, null);
      }
  });
};

module.exports = Places;
