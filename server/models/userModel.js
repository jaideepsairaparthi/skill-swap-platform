const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
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
    skillsOffered: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
      default: [],
      validate: {
        validator: (skills) => skills.every((skill) => mongoose.Types.ObjectId.isValid(skill)),
        message: 'Invalid skill ID in skillsOffered',
      },
    },
    skillsWanted: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
      default: [],
      validate: {
        validator: (skills) => skills.every((skill) => mongoose.Types.ObjectId.isValid(skill)),
        message: 'Invalid skill ID in skillsWanted',
      },
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
    deviceTokens: {
      type: [String], // Store multiple FCM tokens for different devices
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
