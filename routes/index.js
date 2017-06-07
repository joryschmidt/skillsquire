var express = require('express');
var router = express.Router();
var path = require('path');

var user_controller = require('../controllers/user.controller');

router.post('/', user_controller.register);

module.exports = router;