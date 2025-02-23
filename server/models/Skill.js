// models/Skill.js
const skillSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Skill', skillSchema);