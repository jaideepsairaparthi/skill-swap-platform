const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  userA: {
    type: String,
    required: true,
  },
  userB: {
    type: String,
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