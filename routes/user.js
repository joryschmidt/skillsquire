var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/user.controller');

// These routes require the a user to be logged in

router.get('/profile', user_controller.getProfile);

router.put('/add_resource', user_controller.addResource);

router.put('/remove_resource', user_controller.removeResource);

router.post('/rate', user_controller.rate);

module.exports = router;