// models/Match.js
const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  userA: {
    type: String,
    required: true
  },
  userB: {
    type: String,
    required: true
  },
  skillExchanged: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed'],
    default: 'pending',
    required: true
  },
  callHistory: [{
    roomId: String,
    startedAt: { 
      type: Date, 
      default: Date.now 
    },
    duration: Number
  }]
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add index for faster queries
matchSchema.index({ userA: 1, userB: 1, status: 1 });

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;