var Resource = require('../models/Resource.model');
var Queue = require('../models/Queue.model');

// Create a new resource -- Admin function
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

// Add a resource to the queue 
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

// Get the queue of proposed resources -- Admin function
exports.getQueue = function(req, res) {
  Queue.find().exec(function(err, q) {
    if (err) console.log(err);
    else res.json(q);
  });
};

// Remove resource from queue -- Admin function
exports.removeQueueItem = function(req, res) {
  Queue.findOneAndRemove({ _id: req.params.id }, function(err, q) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      console.log(q.name, 'deleted');
      res.status(200).end();
    }
  });
};

// Get all resources
exports.getAll = function(req, res) {
  Resource.find().sort({ rating: -1 }).exec(function(err, resources) {
    if (err) console.log(err);
    else res.json(resources);
  });
};

// Get one resource
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

// Delete a resource -- Admin function
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

// Add a new category -- Admin function
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
