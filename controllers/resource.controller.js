var Resource = require('../models/Resource.model');
var Queue = require('../models/Queue.model');

exports.create = function(req, res) {
  
  var className = req.body.name.replace(/[ .]/g, '');
  
  var newResource = new Resource();
  newResource.name = req.body.name;
  newResource.description = req.body.description;
  newResource.link = req.body.link;
  newResource.color = req.body.color;
  newResource.logo = req.body.logo;
  if (req.body.rating) newResource.rating = Number(req.body.rating);
  newResource.className = className;
  
  newResource.save(function(err, resource) {
    if (err) {
      console.log(err);
      res.status(500).send("Error creating resource. Perhaps try making sure your fields are valid.");
    } else {
      console.log(resource);
      res.json(resource);
    }
  });
};

exports.queue = function(req, res) {
  var newQueue = new Queue();
  newQueue.name = req.body.name;
  newQueue.link = req.body.link;
  newQueue.user = req.body.user;
  
  console.log(req.body);
  
  newQueue.save(function(err, q) {
    if (err) { 
      console.log(err);
      res.status(500);
    } else {
      console.log(q);
      res.json(q);
    }
  });
};

exports.getAll = function(req, res) {
  Resource.find().sort({ rating: -1 }).exec(function(err, resources) {
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
