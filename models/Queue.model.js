var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QueueSchema = new Schema({
  name: String, 
  link: String,
  user: String
});

module.exports = mongoose.model('Queue', QueueSchema);