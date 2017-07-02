var express = require('express');
var path = require('path');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bluebird = require('bluebird');
var sass = require('node-sass-middleware');
var sessions = require('client-sessions');

var User = require('./models/User.model');

var main = require('./routes/index');
var admin = require('./routes/admin');
var resource = require('./routes/resource');

var db = 'mongodb://' + process.env.IP + '/ssq';
mongoose.Promise = bluebird;
mongoose.connect(db);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));

app.use(sass({
  src: path.join(__dirname, 'views'),
  dest: path.join(__dirname, 'views/css'),
  debug: false,
  outputStyle: 'expanded',
  prefix: '/css'
}));

app.use(sessions({
  cookieName: 'session',
  secret: 'ljhkgvtf34587598sdbvkjhvqwr87DFB45345DFV3gbVFv3489724bkbqwg',
  duration: 8 * 60 * 60 * 1000,
  activeDuration: 20 * 60 * 1000
}));

app.use(function(req, res, next){
  if (req.session && req.session.user) {
    User.findOne({ username: req.session.user.username }, function(err, user) {
      if (err) {
        console.log(err);
        res.send('There was an error with your user credentials');
        res.redirect('/');
      } else if (!user) {
        req.session.reset();
        res.redirect('/login');
      } else {
        res.locals.user = user;
        next();
      }
    });
  } else {
    next();
  }
});

app.use('/admin', express.static(path.join(__dirname, 'views/admin_views')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/admin', admin);
app.use('/resource', resource);
app.use('/', main);

var port = process.env.PORT;
app.listen(port, function() {
  console.log('App listening on port', port);
});