var Remind = require('../app/Model/Remind');

var input = {
  email: "cenenh@naver.com",
  name: "cenenh"
};
var remind = new Remind(input);
remind.print();
