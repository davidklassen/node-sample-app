var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var MicropostSchema = mongoose.Schema({
  text: { type: String, match: /^.{1,140}$/ },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { toJSON: { virtuals: true } });

MicropostSchema.plugin(timestamps);

module.exports = mongoose.model('Micropost', MicropostSchema);
