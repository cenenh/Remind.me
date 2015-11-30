/**
 * Created by eunho on 2015-10-31.
 */
var express = require('express');
var User = require('../app/Controller/User');
var router = express.Router();

router.get('/', User.getAll);
router.put('/', User.addUser);
//router.put('/facebook', User...);
//router.put('/google', User...);

module.exports = router;
