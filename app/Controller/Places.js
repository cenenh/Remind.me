/**
 * Created by eunho on 2016-01-11.
 */
var Remind = require('../Model/Remind');
var Places = require('../Model/Places');
var moment = require('moment');
var async = require('async');
var googleMap = require('../../config/googleMap');
var _ = require('underscore');
var category_config = require('../../config/category');

module.exports.search = function(req, res){
  var url = googleMap.url;
  var location = req.body.lat + ',' + req.body.lng;
  var response_arr = [];
  var placesDAO = new Places(location);
  var reminds = req.reminds;

  async.eachSeries(reminds, function(remind, callback){
    var qs = {};
    _.extend(qs, googleMap.params);
    qs.location = location;

    if(remind.company){
      qs.name = remind.company;
    }
    else if(remind.category){
      // category가 drugstore면 올리브영으로 검색.
      if(remind.category === category_config.case_drugstore){
         qs.name = category_config.case_oliveyoung;
         qs.type = '';
      }
      // category가  home_goods_store면 다이소로 검색.
      else if(remind.category === category_config.case_home_goods_store){
        qs.name = category_config.case_daeso;
        qs.type = '';
      }
      // 그 예외 6가지 경우.
      else {
        qs.type = remind.category;
      }
    }

    placesDAO.getPlacesFromGoogle(url, qs, function(err, googlePlaces){
      if(googlePlaces.status !== 'ZERO_RESULTS'){
        async.eachSeries(googlePlaces.results, function(googlePlace, callback){
          response_arr.push({
            name: googlePlace.name,
            id: googlePlace.id,
            place_id : googlePlace.place_id,
            address: googlePlace.vicinity,
            location: googlePlace.geometry.location,
            img_link: remind.img_link,
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
    delete req.reminds;
  });
}
