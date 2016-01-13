var places = require('../app/Controller/Places');
var remind = require('../app/Model/Remind');

var params = {
  email: 'mail'
};

var a = new remind(params);
a.getRemindWithPlaces(function(err, result){
  // console.log(result.length);
  console.log(result);
});

/*
var lat = "37.562121";
var lng = "126.9932705";
console.log(lat+","+lng);
*/

var a = {
    company: null,
    category: '종합생활용품',
    detail_info: 'detail',
    date: 'Wednesday, January 13, 2016 12:07 AM' };

var name = a.company || a.category;
console.log(name);
