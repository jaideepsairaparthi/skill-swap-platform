// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUID: {
    type: String,
    required: true,
    unique: true,
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
  skills: {
    type: [String], // Array of skills
    default: [],
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      review: String,
      rating: Number,
    },
  ],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
