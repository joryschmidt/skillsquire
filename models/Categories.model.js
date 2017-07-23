var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriesSchema = new Schema({
  _id: String,
  categories: [{ type: String }]
});

module.exports = mongoose.model('Categories', CategoriesSchema);