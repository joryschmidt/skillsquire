var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriesSchema = new Schema({
  _id: String,
  categories: Array
});

module.exports = mongoose.model('Categories', CategoriesSchema);