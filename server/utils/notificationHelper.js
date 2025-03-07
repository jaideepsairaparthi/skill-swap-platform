// utils/notificationHelper.js
const admin = require("firebase-admin");
const User = require("../models/userModel"); // Import your User model

// Initialize Firebase Admin (if not already initialized)
if (!admin.apps.length) {
  const serviceAccount = require("./path/to/serviceAccountKey.json"); // Path to your Firebase service account key
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Helper function to send notifications
const sendNotification = async (userId, title, body) => {
  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user || user.deviceTokens.length === 0) {
      console.log("User not found or no device tokens available");
      return;
    }

    // Prepare the message
    const message = {
      notification: { title, body },
      tokens: user.deviceTokens, // Send to all registered devices
    };

    // Send the notification
    const response = await admin.messaging().sendMulticast(message);
    console.log("Notification sent successfully:", response);

    // Check for failures in the response
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
    console.error("Error sending notification:", error);
  }
};

module.exports = sendNotification;
