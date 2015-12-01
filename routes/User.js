/**
 * Created by eunho on 2015-10-31.
 */
var express = require('express');
var User = require('../app/Controller/User');
var router = express.Router();

router.get('/', User.getAll);
router.post('/', User.addUser);
router.post('/:user', User.addUser);

module.exports = router;
