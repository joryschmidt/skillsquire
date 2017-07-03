var User = require('../models/User.model');
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
  if (user) res.json(req.session.user);
  else res.send(null);
};