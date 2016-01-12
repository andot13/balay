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
    _id: Number, 
    author: String,
    body: String,
    date: {
      type: Date,
      default: Date.now
    } 
  }]
});

var Property = mongoose.model('Property', propertySchema);

module.exports = Property;
