var mongoose = require('mongoose');

var reviewsSchema = new mongoose.Schema({
  ptoReviews: [],
  tcReviews: [],
});

module.exports = mongoose.model('Reviews', reviewsSchema);
