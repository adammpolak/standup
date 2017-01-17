var mongoose = require('mongoose');

var daySchema = require('./day').schema;

var timecardSchema = new mongoose.Schema({
  ownerfirstname: String,
  ownerlastname: String,
  ownerid: String,
  weekending: Date,
  status: String,
  monday: daySchema,
  tuesday: daySchema,
  wednesday: daySchema,
  thursday: daySchema,
  friday: daySchema,
  saturday: daySchema,
  sunday: daySchema,
  history: [], //person (first last) - action(string) - (time)
  comments: [],
  approvalflow: [], //level1: _id, approved: false
});

module.exports = mongoose.model('Timecard', timecardSchema);
