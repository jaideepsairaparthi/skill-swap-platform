const admin = require('firebase-admin');
const User = require('../models/userModel');
const Notification = require('../models/Notification');

const sendNotification = async (userId, title, body) => {
  try {
    // Fetch the user's device tokens
    const user = await User.findOne({ firebaseUID: userId });
    if (!user || !user.deviceTokens || user.deviceTokens.length === 0) {
      console.log('❌ User not found or no device tokens available');
      return;
    }

    // ✅ Send the notification via FCM
    const message = {
      notification: { title, body },
      tokens: user.deviceTokens,
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    console.log('🚀 Notification sent successfully:', response);

    // ✅ Store notifications in MongoDB using `messageId`
    response.responses.forEach(async (resp, index) => {
      if (resp.success) {
        const messageId = `${response.multicastId}-${index}`; // Generate unique ID
        const notification = new Notification({
          _id: messageId, // ✅ Use messageId as `_id`
          userId,
          title,
          body,
          read: false,
        });

        await notification.save();
        console.log('✅ Notification saved to database:', notification);
      } else {
        console.error('❌ Failed to send notification:', resp.error);
      }
    });

  } catch (error) {
    console.error('🔥 Error sending notification:', error);
    throw error;
  }
};

module.exports = sendNotification;
