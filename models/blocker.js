var mongoose = require('mongoose');
// var commentSchema = require('./comment').schema;


var blockerSchema = new mongoose.Schema({
  name: String,
  owner: String,
  ownerid: String,
  activestatus: Boolean,
  comments: [],
  resolved: Boolean,
  resolved_at: Date,},
  {timestamps: true});


module.exports = mongoose.model('Blocker', blockerSchema);
