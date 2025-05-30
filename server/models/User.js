const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  mobileno: String,
  email: { type: String, unique: true },
  description: String,
  password: String
});

module.exports = mongoose.model('User', userSchema);
