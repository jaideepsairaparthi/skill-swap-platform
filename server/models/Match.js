const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  userA: { type: String, required: true }, // Firebase UID of the requester
  userB: { type: String, required: true }, // Firebase UID of the target user
  skillExchanged: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'completed'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);