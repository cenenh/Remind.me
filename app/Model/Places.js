/**
 * Created by eunho on 2016-01-11.
 */
var connection = require('../../lib/connection');
var async = require('async');

//Constructor
function Places(params) {
  this.data = params;
};

Places.prototype.print = function(){
  console.log(this.data);
};

Places.prototype.getMyPlaces = function () {
  // body...
};

module.exports = Places;
