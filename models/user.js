var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var timecardSchema = require('./timecard').schema;
var tcApprovalFlowSchema = require('./tcApprovalFlow').schema;
var ptoSchema = require('./pto').schema;
var reviewsSchema = require('./reviews').schema;


var UserSchema = new Schema({
  admin: Boolean,
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  timecards: [timecardSchema],
  tcApprovalFlow: tcApprovalFlowSchema,
  pto: [ptoSchema],
  ptoApprovalFlow: String,
  hasReviews: Boolean,
  tcReviewerOf: [],
  ptoReviewerOf: [],
  reviews: [reviewsSchema],
  approved: [timecardSchema],
  status: String
},{timestamps: true});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
