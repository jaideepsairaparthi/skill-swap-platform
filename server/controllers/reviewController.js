const User = require('../models/userModel');
const Review = require('../models/Review');
const sendNotification = require('../utils/notificationHelper');

// Add Review
const addReview = async (req, res) => {
  const { userId, rating, comment } = req.body;
  const reviewerId = req.user.uid; // Firebase UID of the reviewer

  try {
    // Check if the user being reviewed exists
    const user = await User.findOne({ firebaseUID: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the reviewer exists
    const reviewer = await User.findOne({ firebaseUID: reviewerId });
    if (!reviewer) {
      return res.status(404).json({ message: 'Reviewer not found' });
    }

    // Check if the reviewer is trying to review themselves
    if (reviewerId === userId) {
      return res.status(400).json({ message: 'You cannot review yourself' });
    }

    // Create a new review
    const review = new Review({
      reviewer: reviewerId, // Firebase UID
      reviewee: userId, // Firebase UID
      rating,
      comment,
    });

    await review.save();

    // Update the user's reviews array
    await User.findOneAndUpdate(
      { firebaseUID: userId },
      { $push: { reviews: review._id } },
      { new: true }
    );

    // Send notification to the reviewed user
    await sendNotification(
      user._id, // MongoDB ID of the reviewed user
      'New Review',
      `${reviewer.name} left a review for you.`
    );

    res.status(200).json({ message: 'Review added successfully', review });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Error adding review', error: error.message });
  }
};

module.exports = { addReview };