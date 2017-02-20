var mongoose = require('mongoose');
// var commentSchema = require('./comment').schema;


var standupitemSchema = new mongoose.Schema({
  text: String,
  owner: String,
  ownerid: String,
  completed: Boolean,
  completed_at: Date,
  team: String,},
  {timestamps: true});

standupitemSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

module.exports = mongoose.model('StandupItem', standupitemSchema);
