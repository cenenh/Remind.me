var request = require('request');
var googleMap = require('../config/googleMap');

var request_params = googleMap.params;
request_params.location = "37.5533,126.974";
request_params.name = "GS25";
request({url: googleMap.url, qs: request_params}, function(err, response, body){
    console.log(JSON.parse(body));
});
