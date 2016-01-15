/**
 * Created by eunho on 2015-12-05.
 */
var Remind = require('../Model/Remind');
var moment = require('moment');
var server_config = require('../../config/server');
var multer = require('multer');
var category_config = require('../../config/category');
var urlencode = require('urlencode');

//POST
module.exports.addRemind = function (req, res){
  var response = {};
  var params = {
    email: req.user.email,
    company: urlencode.decode(req.body.company),
    category: urlencode.decode(req.body.category),
    detail_info: urlencode.decode(req.body.detail_info),
    date: moment().format('LLLL')
  };
  
  if(req.uploaded_file_name){
    var img_link = server_config.img_link + req.uploaded_file_name;
    params.img_link = img_link;
  }

  var remindDAO = new Remind(params);
  remindDAO.addRemind(function(error, result){
    if(error){
      response.code = 400;
      response.data = "addRemind FAIL";
    }
    else{
      response.code = 200;
      response.data = "addRemind OK";
      response.remind_index = result.insertId;
    }
    res.json(response);
  });
};

module.exports.changeAlarm = function(req, res){
  var response = {};
  var params = {
    email: req.user.email,
    index: req.body.index
  };
  var remindDAO = new Remind(params);
  remindDAO.changeAlarm(function(err, result){
    if(err){
      response.code = 400;
      response.data = "changeAlarm FAIL";
    }
    else{
      response.code = 200;
      response.data = "changeAlarm OK";
    }
    res.json(response);
  });
};

module.exports.changeBuyComplete = function(req, res){
  var response = {};
  var params = {
    email: req.user.email,
    index: req.body.index
  };
  var remindDAO = new Remind(params);
  remindDAO.changeBuyComplete(function(err, result){
    if(err){
      response.code = 400;
      response.data = "changeBuyComplete FAIL";
    }
    else{
      response.code = 200;
      response.data = "changeBuyComplete OK";
    }
    res.json(response);
  });
}

module.exports.deleteRemind = function(req, res){
  var response = {};
  var params = {
    index: req.body.index
  };
  var remindDAO = new Remind(params);
  remindDAO.deleteRemind(function(err, result){
    if(err){
      response.code = 400;
      response.data = "DELETE FAIL";
    }
    else{
      response.code = 200;
      response.data = "DELETE OK";
    }
    res.json(response);
  });
}

module.exports.getMyRemind = function(req, res){
  var response = {};
  var params = {
    email: req.user.email
  };
  var remindDAO = new Remind(params);
  remindDAO.getMyRemind(function(err, result){
    if(err){
      response.code = 400;
      response.data = "GET REMIND FAIL";
    }
    else{
      response.code = 200;
      response.data = "GET REMIND OK";
      response.reminds = result;
    }
    res.json(response);
  });
}

module.exports.getRemindWithPlaces = function(req, res, next){
  var response = {};
  var params = {
    email: req.user.email,
    location: req.body.lat + ',' + req.body.lng
  };
  var remindDAO = new Remind(params);

  remindDAO.getRemindWithPlaces(function(err, reminds){
    if(err){
      res.json({
        code : 500,
        data : "SERVER_ERROR"
      });
    }
    else {
      if(reminds.length === 0){
        res.json({
          code : 200,
          data :  "NO REMINDS YET"
        })
      }
      else{
        req.reminds = reminds;
        next();
      }
    }
  });
}
