/**
 * Created by eunho on 2015-10-31.
 */
var express = require('express');
var User = require('../app/Controller/User');
var router = express.Router();

router.get('/', User.getAll);
router.post('/', User.addUser);
router.post('/:user', function(req, res){
	var data = req.params;
	data.user = JSON.parse(data.user);

	console.log(req.params.user);
	console.log(data);

	res.send(req.params.user);
});

module.exports = router;
