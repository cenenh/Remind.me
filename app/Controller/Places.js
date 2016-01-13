/**
 * Created by eunho on 2016-01-11.
 */
var Remind = require('../Model/Remind');
var Places = require('../Model/Places');
var moment = require('moment');
var async = require('async');
var googleMap = require('../../config/googleMap');
var _ = require('underscore');

module.exports.search = function(req, res){
  var url = googleMap.url;
  var location = req.body.lat + ',' + req.body.lng;
  var response_arr = [];
  var placesDAO = new Places(location);
  var reminds = req.reminds;
  console.log(reminds);
  console.log("lets search!")

  async.eachSeries(reminds, function(remind, callback){
    var qs = {};
    _.extend(qs, googleMap.params);
    qs.location = location;
    qs.name = remind.company || remind.category;
    placesDAO.getPlacesFromGoogle(url, qs, function(err, googlePlaces){
      if(googlePlaces.status !== 'ZERO_RESULTS'){
        async.eachSeries(googlePlaces.results, function(googlePlace, callback){
          console.log(googlePlace);
          response_arr.push({
            name: googlePlace.name,
            id: googlePlace.id,
            place_id : googlePlace.place_id,
            address: googlePlace.vicinity,
            location: googlePlace.geometry.location,
            todo: remind.detail_info,
            add_remind_date: remind.date
          });
          callback();
        });
      }
      callback(); //remind++
    });
  },function done(){
    res.json({
      code: 200,
      data : response_arr
    });
  });
}

/*module.exports.nearbysearch = function(req, res){
  var url = googleMap.url;
  var response = [];
  var params = {
    email: req.user.email,
    location: req.body.lat + ',' + req.body.lng
  };
  var places = new Places(params);

  async.waterfall([
    function(callback){
      var remindDAO = new Remind(params);

      remindDAO.getRemindWithPlaces(function(err, reminds){
        if(!err){
          callback(null, reminds);
        }
      });
    },
    function(reminds, callback){
      async.eachSeries(reminds, function(remind, callback){
        var qs = {};
        _.extend(qs, googleMap.params);
        qs.location = params.location;
        qs.name = remind.company || remind.category;

        places.getPlacesFromGoogle(url, qs, function(err, googlePlaces){
          async.eachSeries(googlePlaces.results, function(googlePlace, callback){
            response.push({
              name: googlePlace.name,
              id: googlePlace.id,
              place_id : googlePlace.place_id,
              address: googlePlace.vicinity,
              location: googlePlace.location,
              todo: remind.detail_info
            });
            callback(); //googleplace ++;
          }); // async.eachSeries
        });//Places.getPaclesFromGoogle
        callback(); //remind++
      }, function(err, result){
        callback(null, result);
      }); //async.eachSeries
    }
  ], function(err, result){
    res.json({
      code: 200,
      results: response
    });
  });
}*/
