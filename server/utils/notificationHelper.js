const admin = require('firebase-admin');
const User = require('../models/userModel');
const Notification = require('../models/Notification');

const sendNotification = async (userId, title, body) => {
  try {
    // Save the notification in the database
    const notification = new Notification({ userId, title, body, read: false });
    await notification.save();
    console.log('✅ Notification saved to database:', notification);

    // Fetch the user's device tokens
    const user = await User.findOne({ firebaseUID: userId });
    if (!user || !user.deviceTokens || user.deviceTokens.length === 0) {
      console.log('❌ User not found or no device tokens available');
      return;
    }

    // Send the notification via FCM
    const message = {
      notification: { title, body },
      tokens: user.deviceTokens,
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    console.log('🚀 Notification sent successfully:', response);

    // Handle failed tokens
    const invalidTokens = [];
    response.responses.forEach((resp, index) => {
      if (!resp.success) {
        console.error(`❌ Failed to send notification to token ${user.deviceTokens[index]}:`, resp.error);
        if (resp.error.code === 'messaging/registration-token-not-registered') {
          invalidTokens.push(user.deviceTokens[index]); // Collect invalid tokens
        }
      }
    });

    // Remove invalid tokens from the database
    if (invalidTokens.length > 0) {
      await User.updateOne(
        { firebaseUID: userId },
        { $pull: { deviceTokens: { $in: invalidTokens } } }
      );
      console.log('🗑 Removed invalid tokens:', invalidTokens);
    }
  } catch (error) {
    console.error('🔥 Error sending notification:', error);
    throw error;
  }
};

module.exports = sendNotification;
