var User = require('../models/User.model');
var Resource = require('../models/Resource.model');
var bcrypt = require('bcrypt');

// Register a new user
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

// Login a user
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

// Logout the logged in user
exports.logout = function(req, res) {
  req.session.reset();
  console.log('Logged out');
  res.redirect('/');
};

// Get a JSON object representing the logged in user
exports.getUser = function(req, res) {
  var user = req.session.user;
  if (user) res.json(user);
  else res.status(404).end();
};

// Get a logged in user and the associated resources -- User function
exports.getProfile = function(req, res) {
  var user = req.session.user;
  if (user) {
    User.findOne({ username: user.username }, function(err, user) {
      if (err) console.log('MongoDB could not find user');
      else {
        var list = user.resourceList;
        if (list) {
          Resource.find({ _id: { $in: list }}, function(err, rscs) {
            if (err) {
              console.log(err);
              res.json({ user: user, resources: [] });
            } else {
              res.json({ user: user, resources: rscs });
            }
          });
        } else {
          res.json({ user: user, resources: [] });
        }
      }
    });
  }
  else res.status(404).send(null);
};

// Add a resource to a user profile -- User function
exports.addResource = function(req, res) {
  var id = req.body.id;
  User.update({ _id: req.session.user._id }, { $push: { resourceList: id }}, function(err, raw) {
    if (err) {
      console.log(err);
      res.status(500).end();
    }
    else {
      console.log('MongoDB says:', raw);
      res.status(200).end();
    }
  });
};

// Remove a resource from a user profile -- User function
exports.removeResource = function(req, res) {
  var id = req.body.id;
  User.update({ _id: req.session.user._id }, { $pull: { resourceList: id }}, function(err, raw) {
    if (err) {
      console.log(err);
      res.status(500).end();
    }
    else console.log('MongoDB says:', raw);
    res.status(200).end();
  });
};

// Rate a resource -- User function
exports.rate = function(req, res) {
  var name = req.body.name;
  var rating = Number(req.body.rating);
  User.findOne({ _id: req.session.user._id }, function(err, user) {
    if (err) {
      console.log(err);
      res.status(500).send('User could not be found');
    } else {
      var ratings = user.ratings || {};
      console.log(name);
      if (!ratings[name]) {
        updateRating(name, rating, false);
      } else {
        updateRating(name, rating, true, ratings[name]);
      }
      ratings[name] = rating;
      User.update({ _id: req.session.user._id }, { $set: { ratings: ratings }}, function(err, raw) {
        if (err) {
          console.log(err);
          res.status(500).send('New rating could not be saved');
        } else {
          console.log('MongoDB says:', raw);
          res.status(200).end();
        }
      });    
    }
  });
};

// Update or add new resource rating in database
function updateRating(rscName, rating, rerate, old_rating) {
  var newRating;
  Resource.findOne({ className: rscName }, function(err, resource) {
    if (err) console.log(err);
    else {
      if (rerate) {
        newRating = (resource.rating * resource.numRatings - old_rating + rating)/ resource.numRatings;
        Resource.update({ className: rscName }, { $set: { rating: newRating }}, function(err, raw) {
          if (err) console.log(err);
          else console.log('Rerate successful');
        });
      } else {
        newRating = (resource.rating * resource.numRatings + rating)/(resource.numRatings + 1);
        Resource.update({ className: rscName }, { $set: { rating: newRating }, $inc: {numRatings : 1}}, function(err, raw) {
          if (err) console.log(err);
          else console.log('Rating updated and numRatings incremented');
        });
      }
    }
  });
}