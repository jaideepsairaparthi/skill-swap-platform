const admin = require('firebase-admin');
const User = require('../models/userModel');
const Notification = require('../models/Notification'); // Import the Notification model

const sendNotification = async (userId, title, body) => {
  try {
    // Save the notification to the database
    const notification = new Notification({ userId, title, body, read: false });
    await notification.save();
    console.log('Notification saved to database:', notification);

    // Fetch the user's device tokens
    const user = await User.findOne({ firebaseUID: userId });
    if (!user || !user.deviceTokens || user.deviceTokens.length === 0) {
      console.log('User not found or no device tokens available');
      return;
    }

    // Send the notification via FCM
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
    throw error; // Propagate the error to the controller
  }
};

module.exports = sendNotification;