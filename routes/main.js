var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/user.controller');
var resource_controller = require('../controllers/resource.controller');
var categories_controller = require('../controllers/categories.controller');

router.get('/user', user_controller.getUser);

router.get('/user/profile', user_controller.getProfile);

router.post('/user', user_controller.register);

router.put('/user/add_resource', user_controller.addResource);

router.put('/user/remove_resource', user_controller.removeResource);

router.post('/login', user_controller.login);

router.get('/logout', user_controller.logout);

router.get('/resources', resource_controller.getAll);

router.get('/categories', categories_controller.getAll);

router.put('/categories/add', categories_controller.addCategory);

router.put('/categories/remove', categories_controller.removeCategory);

module.exports = router;