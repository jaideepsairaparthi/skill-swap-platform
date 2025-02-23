// models/Match.js
const matchSchema = new mongoose.Schema({
    userA: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userB: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    skillExchanged: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'completed'], default: 'pending' },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Match', matchSchema);