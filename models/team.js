var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
  name: String,
  blockers: [],
  resolvedblockers: [],
  standups: [],
  archivedstandups: [],
  members: [],
  logourl: String,
});

module.exports = mongoose.model('Team', teamSchema);
