var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  teams: []
  },
  {timestamps: true});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
