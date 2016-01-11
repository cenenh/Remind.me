var _ = require('underscore');
var googleMap = require('../config/googleMap');

var request_params = {};
_.extend(request_params, googleMap.params);

request_params.location = 'test_a';
request_params.name = 'test_a';
console.log(googleMap);
console.log(request_params);
delete request_params;
console.log(request_params);
