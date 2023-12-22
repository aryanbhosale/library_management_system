const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

user.methods.validPassword = async function (password) {
    try {
      if (!this.password) {
        return false; // Handle case where password is not set
      }
      console.log("THIS: ", this);
      console.log("PASSWORD: ", password);
      const match = await bcrypt.compare(password, this.password);
      console.log("MATCH: ", match);
      return match; // Returns true if passwords match, false otherwise
    } catch (error) {
      throw new Error(error);
    }
  };

module.exports = mongoose.model('User', user);
