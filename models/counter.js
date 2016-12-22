var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counterSchema = new Schema({
  name: String,
  value: Number
});

counterSchema.pre('save', function(next){
  this.value = 0;
  next();
});

module.exports = mongoose.model('Counter', counterSchema);
