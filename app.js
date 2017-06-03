var express = require('express');
var path = require('path');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bluebird = require('bluebird');

var user_controller = require('./controllers/user.controller');

var db = 'mongodb://' + process.env.IP + '/ssq';
mongoose.Promise = bluebird;
mongoose.connect(db);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'views')));

app.post('/', user_controller.register);

var port = process.env.PORT;
app.listen(port, function() {
  console.log('App listening on port', port);
});