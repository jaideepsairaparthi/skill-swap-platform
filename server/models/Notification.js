const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // ✅ Store `messageId` as a string
  userId: { type: String, required: true }, // Firebase UID
  title: { type: String, required: true },
  body: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
