var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var areaSchema = new Schema({
  name: String,
  properties: [{
    type: Schema.Types.ObjectId,
    ref: 'Property'
  }]
});

var Area = mongoose.model('Area', areaSchema);

module.exports = Area;
