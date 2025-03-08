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
    profilePic: {
      type: String, // URL of the profile picture
      default: "https://via.placeholder.com/150", // Default placeholder image
    },
    skillsOffered: {
      type: [String], // Store skill names directly
      default: [],
    },
    skillsWanted: {
      type: [String], // Store skill names directly
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
    deviceTokens: {
      type: [String], // Store multiple FCM tokens for different devices
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);