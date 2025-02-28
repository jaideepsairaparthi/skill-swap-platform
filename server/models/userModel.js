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
  skillsOffered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
  skillsWanted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
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

module.exports = mongoose.model('User', userSchema);