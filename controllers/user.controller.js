var User = require('../models/User.model');

exports.register = function(req, res) {
  
  var newUser = new User();
  newUser.username = req.body.username;
  newUser.email = req.body.email;
  newUser.password = req.body.password;
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
      res.send("You've signed up successfully");
    }
  });
};

exports.login = function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) console.log(err);
    if (!user) {
      console.log("That user doesn't seem to exist");
    } else if (req.body.password === user.password){
      console.log('Login successful');
    } else {
      console.log('Wrong password') ;
    }
  });
};