/**
 * Created by eunho on 2015-10-31.
 */
var express = require('express');
var User = require('../app/Controller/User');
var router = express.Router();

//localhost:8080/user

router.get('/all', User.getAll);

router.post('/auth/signup', User.addUser);

//for Facebook & Google login
// router.post('/:user', User.addUser);
// linux server에서 res.redirect(307); 이 잘 안먹힘.
router.get('/:user', User.addUser);

//localhost:8080/user/auth/login
router.post('/auth/login', User.getUserForLogin);

module.exports = router;
