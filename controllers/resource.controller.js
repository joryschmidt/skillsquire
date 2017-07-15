var Resource = require('../models/Resource.model');

exports.create = function(req, res) {
  
  var className = req.body.name.replace(/[ .]/g, '');
  
  var newResource = new Resource();
  newResource.name = req.body.name;
  newResource.description = req.body.description;
  if (req.body.rating) newResource.rating = Number(req.body.rating);
  newResource.className = className;
  
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

exports.deleteResource = function(req, res) {
  Resource.findOneAndRemove({ _id: req.params.id }, function(err, resource) {
    if (err) console.log(err);
    console.log(resource.name, 'has been deleted.');
  });
};