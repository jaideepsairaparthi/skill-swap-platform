const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  userA: {
    type: String, // Firebase UID of userA
    required: true,
  },
  userB: {
    type: String, // Firebase UID of userB
    required: true,
  },
  skillExchanged: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);
