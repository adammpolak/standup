var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProjectSchema = new Schema({
  name: String,
  imgsrc: String,
  short_description: String,
  long_description: String,
  links: [],
  created_at: Date,
  updated_at: Date,
});

ProjectSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

module.exports = mongoose.model('Project', ProjectSchema);
