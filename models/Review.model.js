var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  user: { 
    type: Schema.ObjectId, 
    ref: 'User',
    required: true
    
  },
  resource: { 
    type: Schema.ObjectId, 
    ref: 'Resource',
    required: true 
  },
  text: {
    type: String,
    required: true
  }
  created: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number
  }
});

module.exports = mongoose.model('Review', ReviewSchema);
