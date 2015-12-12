/**
 * Created by eunho on 2015-12-05.
 */

 //Controller of Remind.

 var Remind = require('../Model/Remind');
 var moment = require('moment');
 var server_config = require('../../config/server');
 var multer = require('multer');

//POST
module.exports.addRemind = function (req, res){
  var response = {};
  var params = {
    email : req.user.email,
    company: req.body.company,
    category: req.body.category,
    detail_info: req.body.detail_info,
    date: moment().format('LLLL')
  };
  if(req.uploaded_file_name){
    var img_link = server_config.img_link + req.uploaded_file_name;
    params.img_link = img_link;
  }
  var remindDAO = new Remind(params);
  console.log("requested data");
  remindDAO.print();
  remindDAO.addRemind(function(error, result){
    if(error){
      response.code = 400;
      response.data = "addRemind FAIL";
    }
    else{
      response.code = 200;
      response.data = "addRemind OK";
    }
    res.json(response);
  });
};
