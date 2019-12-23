var express = require('express');
var path = require('path');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bluebird = require('bluebird');
var sass = require('node-sass-middleware');
var sessions = require('client-sessions');
require('dotenv').config();

var main = require('./routes/main');
var admin = require('./routes/admin');
var resource = require('./routes/resource');
var user = require('./routes/user');

var host = process.env.IP || '0.0.0.0';
var db = 'mongodb://' + host + '/ssq';
var mongoose_options = { 
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.Promise = bluebird;
mongoose.connect(process.env.MONGODB_URI || db, mongoose_options);

var app = express();

// Middleware for Sass, session functionality, and req.body
app.use(sass({
  src: path.join(__dirname, 'views/css/sass'),
  dest: path.join(__dirname, 'views/css'),
  debug: false,
  outputStyle: 'expanded',
  prefix: '/css'
}));

app.use(sessions({
  cookieName: 'session',
  secret: process.env.SSQ_SESSION,
  duration: 8 * 60 * 60 * 1000,
  activeDuration: 20 * 60 * 1000
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'views')));
app.use('/admin', requireAdmin, express.static(path.join(__dirname, 'views/admin_views')));
app.use('/syntax', express.static(path.join(__dirname, 'views/syntax')));

app.use('/admin', requireAdmin, admin);
app.use('/resource', resource);
app.use('/user', requireLogin, user);
app.use('/', main);

var port = process.env.PORT;
app.listen(port, function() {
  console.log('App listening on port', port);
});

// Custom middleware
function requireAdmin(req, res, next) {
  if (req.session.user && req.session.user.admin) {
    next();
  } else {
    res.redirect('/');
  }
}

function requireLogin(req, res, next) {
  if (req.session.user) next();
  else res.status(404).json(null);
}