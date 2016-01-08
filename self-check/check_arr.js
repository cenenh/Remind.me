var _ = require("underscore");
var calendars = [1, "String", {}, 1.1, true],
    newArray = [];

_.each(calendars, function (item, index) {
    newArray.push(item);
});

console.log(newArray);

function set_next_token(token) {
  if(token){
    return true;
  }
  return false;
}

var a = {
  html_attributions: [],
  next_page_token: 'CoQC9gAAAOnm5eO8SM1nj60HvsxiknPLy-xXe8DkwRoUIu1VddLjkxvsnlBsw7xD9JAPfaEKRkzgZZX4RFfjJgY3QJ65wChALd1x9Nu8uiivPYpjURlPFCasHnncWaEkXobwnzbzGpsLEPtPPt1r1Z50Hw_2fRyQm1ZETtFNkYK-N36SZ1wBo2TuILZH96whj8bc1rb-0afLvHfw51ACFywMv9k6MPCH-UJZWMa0KvOJmk5dXBtOYNR1INnCgpaWQBxe85gZqOXwex8iCq-eSN-JYYxXRoxL4XYDV2qVsHybUHVTcmLWsqh3SYOuKpr2OlSlcbOAy_ya5k85pGGfphn9bIkXCGgSEHrmD7oNNjF5cudJag7pI9kaFN1tpOf-0BH4Di23SAwgvCx0Vf2o',
  results: 'gg'
};

console.log(a.new_token);
console.log(set_next_token(a.new_token));
