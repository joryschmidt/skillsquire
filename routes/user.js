var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/user.controller');

router.get('/', user_controller.getUser);

router.post('/', user_controller.register);

router.get('/profile', user_controller.getProfile);

router.put('/add_resource', user_controller.addResource);

router.put('/remove_resource', user_controller.removeResource);

router.post('/rate', user_controller.rate);

module.exports = router;