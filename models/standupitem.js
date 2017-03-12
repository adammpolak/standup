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

module.exports = mongoose.model('StandupItem', standupitemSchema);
