const mongoose = require('mongoose');

const Schema = mongoose.Schema,
  model = mongoose.model.bind(mongoose),
  ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
  id: ObjectId,
  email: String,
  password: String,
  created_at: { type: Date, default: Date.now }
});

const User = model('User', userSchema);
module.exports = User