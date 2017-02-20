var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
  name: String,
  blockers: [],
  resolvedblockers: [],
  standups: [],
  archivedstandups: [],
  members: [],
});

module.exports = mongoose.model('Team', teamSchema);
