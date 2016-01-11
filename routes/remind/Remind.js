/**
 * Created by eunho on 2015-12-05.
 */
var express = require('express');
var jwt = require('../../app/Controller/Jwt');
var router = express.Router();
var Remind = require('../../app/Controller/Remind');

var multer = require('multer');
var moment = require('moment');
var mime = require('mime');

var storage = multer.diskStorage({
  destination: function(req, file, callback){
    callback(null, './public/images');
  },
  filename: function(req, file, callback){
    var timestamp =  moment().format("x");
    var extension = mime.extension(file.mimetype);
    var file_name = "img_"+ req.user.email + "_" + timestamp + "." + extension;
    console.log(file_name);
    req.uploaded_file_name = file_name; //save url in database;
    callback(null, file_name);
  }
});
var upload = multer({
  storage : storage
});

router.use('/', jwt.isAuthenticated);

router.post('/', upload.single('img'), Remind.addRemind);

router.put('/alarm', Remind.changeAlarm);

router.put('/complete', Remind.changeBuyComplete);

router.delete('/', Remind.deleteRemind);

router.get('/', Remind.getMyRemind);

router.post('/nearbysearch', Remind.nearbysearch);

module.exports = router;
