var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var User = new Schema({
  displayName: {
    type: String
  },
  image: {
    type: String
  },
  facebook: {
    id: String,
    token: String,
    email: String
  },
  google: {
    id: String,
    token: String,
    email: String
  },
  local: {
    email: String, 
    password: String,
    name: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

User.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
User.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password);
};

var User = mongoose.model('User', User); 

module.exports = User;

