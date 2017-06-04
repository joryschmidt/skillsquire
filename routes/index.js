var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/user.controller');

router.get('/', function(req, res) {
  res.render('../views/newdex');
});
router.post('/', user_controller.register);

module.exports = router;