var express = require('express');
var router = express.Router();

var resource_controller = require('../controllers/resource.controller');

router.get('/:id', resource_controller.getOne);

router.post('/queue', resource_controller.queue);

module.exports = router;