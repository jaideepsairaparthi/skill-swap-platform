const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewer: { type: String, required: true }, // Use String for Firebase UID
  reviewee: { type: String, required: true }, // Use String for Firebase UID
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, maxlength: 500 },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);