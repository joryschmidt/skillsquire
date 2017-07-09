var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResourceSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  date: {
    type: Date,
    default: Date.now
  },
  className: {
    type: String,
    lowercase: true
  }
});

module.exports = mongoose.model('Resource', ResourceSchema);