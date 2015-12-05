var request = require("request");

var req_data = {
  data: 600,
  item_list: [
    {
      item_name: "지오다노 셔츠"
    },
    {
      item_name: "지오다노 슬렉스"
    },
    {
      item_name: "지오다노 우산"
    }
  ]
};
request({
  method: 'POST',
  uri: 'http://localhost:8080/test/echo',
  headers:{
    'content-type': 'application/json'
  },
  body: JSON.stringify(req_data)
}, function(error, response, body){
  console.log(response.statusCode);
  console.log(response.body);
});
