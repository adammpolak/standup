var mongoose = require('mongoose');

var ptoSchema = new mongoose.Schema({
  startdate: Date,
  enddate: Date,
  status: String,
});

module.exports = mongoose.model('PTO', ptoSchema);
