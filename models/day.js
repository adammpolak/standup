var mongoose = require('mongoose');

var daySchema = new mongoose.Schema({
  call: String,
  wrap: String,
  meal1out: String,
  meal1in: String,
  meal2out: String,
  meal2in: String,
  daytype: String,
  location: String,
  state: String,
  perdiem: Boolean,
  projects: []
});

module.exports = mongoose.model('Day', daySchema);
