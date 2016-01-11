var express = require('express');
var User = require('../../app/Model/User');
var router = express.Router();
var request = require('request');
var google_api_url = "https://www.googleapis.com/oauth2/v3/tokeninfo";

//localhost:8888/auth/google_login/token

router.post('/', function(req, res){

  var params = {
    id_token: req.body.access_token
  };
  request({url:google_api_url, qs:params}, function(err, response, body){
    if(err){
      res.json({
        code: 500,
        data: "SERVER ERROR"
      });
    } //if err
    else{
      if(response.statusCode === 400){
        res.json({
          code : 401,
          data : "invalid token"
        });
      } //if res.code === 400
      //success!
      else if(response.statusCode === 200){
        var result = JSON.parse(body);
        var user = {
          email: result.email,
          name : result.name,
          password: result.sub, //user_id in google
        };
		console.log(user);
        user = JSON.stringify(user);
        //res.redirect(307, 'http://54.65.85.60:8080/user/'+encodeURIComponent(user));
		res.redirect('http://54.65.85.60:8080/user/'+encodeURIComponent(user));
	  } //if res.code === 200
      else{
        res.json({
          code: 999,
          data: "Unknown-err"
        });
      } // if res.code !== 200 || res.code !== 400
    } //else, if not err
  });
});

module.exports = router;
