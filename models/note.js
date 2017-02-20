var mongoose = require('mongoose');
// var noteSchema = require('./note').schema;


var noteSchema = new mongoose.Schema({
  text: String,
  owner: String,
  ownerid: String,},
  {timestamps: true});

noteSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

module.exports = mongoose.model('Note', noteSchema);
