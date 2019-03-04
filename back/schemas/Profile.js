const mongoose = require('mongoose');

const Schema = mongoose.Schema,
  model = mongoose.model.bind(mongoose),
  ObjectId = mongoose.Schema.Types.ObjectId;

const profileSchema = new Schema({
  id: ObjectId,
  firstName: String,
  created_at: { type: Date, default: Date.now }
});

const User = model('Profile', profileSchema);
module.exports = User