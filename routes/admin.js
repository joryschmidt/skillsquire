var express = require('express');
var router = express.Router();
var path = require('path');

var user_controller = require('../controllers/user.controller');

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/admin.html'));
});

router.post('/', user_controller.register);

module.exports = router;