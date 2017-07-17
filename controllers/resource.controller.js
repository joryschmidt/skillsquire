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
      res.json(resource);
    }
  });
};

exports.getAll = function(req, res) {
  Resource.find(function(err, resources) {
    if (err) console.log(err);
    else res.json(resources);
  });
};

exports.getOne = function(req, res) {
  Resource.findOne({ _id: req.params.id }, function(err, resource) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.json(resource);
    }
  });
};

exports.deleteResource = function(req, res) {
  Resource.findOneAndRemove({ _id: req.params.id }, function(err, resource) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      console.log(resource.name, 'has been deleted.');
      res.status(200).end();
    }
  });
};

exports.addCategory = function(req, res) {
  Resource.update({ _id: req.params.id }, { $push: { categories: req.body.cat }}, function(err, raw) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      console.log(raw);
      res.status(200).end();
    }
  });
};