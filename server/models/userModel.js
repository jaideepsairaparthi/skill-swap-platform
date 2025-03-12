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
      type: String,
      default: "https://via.placeholder.com/150",
    },
    skillsOffered: {
      type: [String],
      default: [],
    },
    skillsWanted: {
      type: [String],
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
      type: [String],
      default: [],
    },
    location: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Calculate and update user rating
userSchema.methods.updateRating = async function () {
  const reviews = await mongoose.model('Review').find({ reviewee: this._id });
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  this.rating = reviews.length > 0 ? totalRating / reviews.length : 0;
  await this.save();
};

module.exports = mongoose.model('User', userSchema);