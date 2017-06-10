var Resource = require('../models/Resource.model');

exports.create = function(req, res) {
  
  var newResource = new Resource();
  newResource.name = req.body.name;
  newResource.description = req.body.description;
  
  newResource.save(function(err, resource) {
    if (err) {
      console.log(err);
      res.send('Error creating resource');
    } else {
      console.log(resource);
      res.send('Resource successfully created');
    }
  });
};

exports.getAll = function(req, res) {
  Resource.find(function(err, resources) {
    if (err) console.log(err);
    else res.json(resources);
  });
};