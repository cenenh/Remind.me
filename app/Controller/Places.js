/**
 * Created by eunho on 2016-01-11.
 */
 var Remind = require('../Model/Remind');
 var moment = require('moment');

module.exports.getMyRemind = function(req, res){

}

module.exports.nearbysearch = function(req, res){
  var response = {};
  var params = {
    email: req.user.email,
    latitude : req.body.latitude,
    longtitude : req.body.longtitude
  };
}
