var express = require('express');
var router = express.Router();
var path = require('path');

var user_controller = require('../controllers/user.controller');
var resource_controller = require('../controllers/resource.controller');

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/admin_views/admin.html'));
});

router.post('/', user_controller.register);

router.get('/resource', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/admin_views/resource.html'));
});

router.post('/resource', resource_controller.create);

module.exports = router;