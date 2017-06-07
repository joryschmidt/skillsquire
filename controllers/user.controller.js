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