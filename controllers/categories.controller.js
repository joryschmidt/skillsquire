var Categories = require('../models/Categories.model');

exports.getAll = function(req, res) {
  Categories.find({ _id: 'categories' }, function(err, cats) {
    if (err) res.status(404).end();
    else res.json(cats);
  });
};

exports.addCategory = function(req, res) {
  Categories.update({ _id: 'categories' }, { $push: { categories: req.body.cat }}, function(err, response) {
    if (err) {
      console.log(response);
      res.status(500).end();
    }
    else {
      console.log(response);
      res.status(200).end();
    }
  });
};

exports.removeCategory = function(req, res) {
  Categories.update({ _id: 'categories' }, { $pull: { categories: req.body.cat }}, function(err, response) {
    if (err) {
      console.log(err);
      res.status(500).end();
    }
    else {
      console.log(response);
      res.status(200).end();
    }
  });
};