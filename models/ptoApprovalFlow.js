var mongoose = require('mongoose');

var ptoApprovalFlowSchema = new mongoose.Schema({
  String,
});

module.exports = mongoose.model('ptoApprovalFlow', ptoApprovalFlowSchema);
