var express = require('express');
var router = express.Router();

var resource_controller = require('../controllers/resource.controller');

router.get('/:id', resource_controller.getOne);

router.delete('/:id', resource_controller.deleteResource);

module.exports = router;