const admin = require("firebase-admin");
const User = require("../models/userModel");
const Notification = require("../models/Notification");

const sendNotification = async (userId, title, body) => {
  try {
    const user = await User.findOne({ firebaseUID: userId });
    if (!user || !user.deviceTokens || user.deviceTokens.length === 0) {
      console.log("User not found or no device tokens available");
      return;
    }

    const message = {
      notification: { title, body },
      tokens: user.deviceTokens,
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    console.log("Notification sent successfully:", response);

    for (let i = 0; i < response.responses.length; i++) {
      if (response.responses[i].success && response.responses[i].messageId) {
        const messageId = response.responses[i].messageId;
        console.log("Generated messageId:", messageId);

        const notification = new Notification({
          messageId,
          userId,
          title,
          body,
          read: false,
        });

        await notification.save();
        console.log("Notification saved to database:", notification);
      } else {
        console.error("Failed to send notification:", response.responses[i].error);
      }
    }
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
};

module.exports = sendNotification;
