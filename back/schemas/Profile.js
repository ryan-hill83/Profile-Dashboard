const mongoose = require('mongoose');

const Schema = mongoose.Schema,
  model = mongoose.model.bind(mongoose),
  ObjectId = mongoose.Schema.Types.ObjectId;

const profileSchema = new Schema({
  id: ObjectId,
  name: String,
  filename: String,
  description: String,
  created_at: { type: Date, default: Date.now }
});

const Profile= model('Profile', profileSchema);
module.exports = Profile