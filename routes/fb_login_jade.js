var express = require('express');
var router = express.Router();

/* GET facebook-login page. */
router.get('/', function(req, res, next) {
  res.render('facebook_login', { title: 'Facebook-Login-With-sGen_Remind.me' });
  // res.reder( jade-file-name, title )
});

module.exports = router;
