const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  userA: {
    type: String,
    required: true,
    validate: {
      validator: (uid) => uid.length > 0, // Basic validation for Firebase UID
      message: 'Invalid Firebase UID for userA',
    },
  },
  userB: {
    type: String,
    required: true,
    validate: {
      validator: (uid) => uid.length > 0, // Basic validation for Firebase UID
      message: 'Invalid Firebase UID for userB',
    },
  },
  skillExchanged: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed'],
    default: 'pending',
  },
}, { timestamps: true });

// Add indexes for faster queries
matchSchema.index({ userA: 1 });
matchSchema.index({ userB: 1 });
matchSchema.index({ status: 1 });

module.exports = mongoose.model('Match', matchSchema);