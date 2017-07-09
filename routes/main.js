var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/user.controller');
var resource_controller = require('../controllers/resource.controller');

router.get('/user', user_controller.getUser);

router.post('/user', user_controller.register);

router.post('/login', user_controller.login);

router.get('/logout', user_controller.logout);

router.get('/resources', resource_controller.getAll);



module.exports = router;