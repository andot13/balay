var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: { type: String, required: true}, 
  password: String,
  name: String,
  created_at: Date
});

User.plugin(passportLocalMongoose);

var User = mongoose.model('User', User); 

module.exports = User;
