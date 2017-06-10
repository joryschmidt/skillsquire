var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/user.controller');
var resource_controller = require('../controllers/resource.controller');

router.post('/', user_controller.register);
router.get('/get_resources', resource_controller.getAll);

module.exports = router;