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
  },
  link: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#cccccc'
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  numRatings: {
    type: Number,
    default: 0
  },
  created: {
    type: Date,
    default: Date.now
  },
  className: {
    type: String,
    lowercase: true
  },
  categories: [String]
});

module.exports = mongoose.model('Resource', ResourceSchema);