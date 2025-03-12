const admin = require('firebase-admin');
const User = require('../models/userModel');

const sendNotification = async (userId, title, body) => {
  try {
    const user = await User.findById(userId);
    if (!user || user.deviceTokens.length === 0) {
      console.log('User not found or no device tokens available');
      return;
    }

    const message = {
      notification: { title, body },
      tokens: user.deviceTokens,
    };

    const response = await admin.messaging().sendMulticast(message);
    console.log('Notification sent successfully:', response);

    if (response.failureCount > 0) {
      response.responses.forEach((resp, index) => {
        if (!resp.success) {
          console.error(
            `Failed to send notification to token ${user.deviceTokens[index]}:`,
            resp.error
          );
        }
      });
    }
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

module.exports = sendNotification;