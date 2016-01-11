var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var propertySchema = new Schema({
  name: String,
  bedroom: Number,
  shower: Number,
  created_at: {
    type: Date, 
    default: Date.now
  },
  comments: [{
    body: String,
    date: Date
  }]
});

var Property = mongoose.model('Property', propertySchema);

module.exports = Property;
