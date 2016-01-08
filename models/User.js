var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String,
    required: true
  }
});

User.plugin(passportLocalMongoose);

var User = mongoose.model('User', User); 

module.exports = User;
