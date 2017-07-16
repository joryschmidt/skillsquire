var User = require('../models/User.model');
var Resource = require('../models/Resource.model');
var bcrypt = require('bcrypt');

exports.register = function(req, res, next) {
  
  var hash = bcrypt.hashSync(req.body.password, 10);
  
  var newUser = new User();
  newUser.username = req.body.username;
  newUser.email = req.body.email;
  newUser.password = hash;
  if (req.body.isAdmin) {
    newUser.admin = true;
  }
  
  newUser.save(function(err, user) {
    if (err) {
      console.log(err);
      res.send("There was an error registering user");
    }
    else {
      console.log(user);
      res.end();
      next();
    }
  });
};

exports.login = function(req, res, next) {
  User.findOne({ username: req.body.username }, function(err, user) {
    if (err) console.log(err);
    if (!user) {
      console.log("That user doesn't seem to exist");
      res.status(401).end();
      next();
    } else if (bcrypt.compareSync(req.body.password, user.password)) {
      delete user.password;
      req.session.user = user;
      console.log('Login successful');
      res.end();
      next();
    } else {
      console.log('Wrong password mate') ;
    }
  });
};

exports.logout = function(req, res) {
  req.session.reset();
  console.log('Logged out');
  res.redirect('/');
};

exports.getUser = function(req, res) {
  var user = req.session.user;
  if (user) res.json(user);
  else res.status(404).end();
};

exports.getProfile = function(req, res) {
  var user = req.session.user;
  if (user) {
    var list = user.resourceList;
    if (list) {
      Resource.find({ _id: { $in: list }}, function(err, rscs) {
        if (err) {
          console.log(err);
          res.status(404).end();
        } else {
          res.json({ user: user, list: rscs });
        }
      });
    } else {
      res.json({ user: user, list: [] });
    }
  }
  else res.status(404).send(null);
};

exports.addResource = function(req, res) {
  var id = req.body.id;
  User.update({ _id: req.session.user._id }, { $push: { resourceList: id }}, function(err, raw) {
    if (err) console.log(err);
    else console.log('MongoDB says:', raw);
  });
};
