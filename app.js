var express = require('express');
var path = require('path');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bluebird = require('bluebird');
var sass = require('node-sass-middleware');

var routes = require('./routes/index');
var admin = require('./routes/admin');

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
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', routes);
app.use('/admin', admin);

var port = process.env.PORT;
app.listen(port, function() {
  console.log('App listening on port', port);
});