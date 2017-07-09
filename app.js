var express = require('express');
var path = require('path');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bluebird = require('bluebird');
var sass = require('node-sass-middleware');
var sessions = require('client-sessions');

var main = require('./routes/main');
var admin = require('./routes/admin');
var resource = require('./routes/resource');

var db = 'mongodb://' + process.env.IP + '/ssq';
mongoose.Promise = bluebird;
mongoose.connect(db);

var app = express();

// Middleware
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'views')));
app.use('/admin', requireAdmin, express.static(path.join(__dirname, 'views/admin_views')));

app.use('/admin', requireAdmin, admin);
app.use('/resource', resource);
app.use('/', main);

// app.use(function(req, res) {
//   res.sendFile(path.join(__dirname, 'views/index.html'));
// });

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
  else res.redirect('/login');
}