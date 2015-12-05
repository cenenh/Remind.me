var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
    console.log(req.body);
    res.json(req.body);

});
router.get('/', function(req, res){
  console.log(req.params);
  res.json(req.params);
});

module.exports = router;
