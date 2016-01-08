var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var propertySchema = new Schema({
  name: String,
  bedroom: Number,
  shower: Number
});

var Property = mongoose.model('Property', propertySchema);

module.exports = Property;
