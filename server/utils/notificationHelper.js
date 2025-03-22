const admin = require("firebase-admin");
const User = require("../models/userModel");
const Notification = require("../models/Notification");

const sendNotification = async (userId, title, body) => {
  try {
    const user = await User.findOne({ firebaseUID: userId });

    if (!user || !user.deviceTokens || user.deviceTokens.length === 0) {
      console.log("User not found or no device tokens available");
      return { success: false, message: "User not found or no device tokens available" };
    }

    const message = {
      notification: { title, body },
      tokens: user.deviceTokens,
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    console.log("✅ Notification sent successfully:", response);

    if (response.responses.some((resp) => resp.success && resp.messageId)) {
      const messageId = `projects/skillswap-3f118/messages/${response.responses.find((resp) => resp.success).messageId}`;

      const existingNotification = await Notification.findOne({ messageId });

      if (!existingNotification) {
        const notification = new Notification({
          messageId,
          userId,
          title,
          body,
          read: false,
        });

        await notification.save();
        console.log("✅ Notification saved to database:", notification);
      } else {
        console.log("⚠️ Notification already exists, skipping save.");
      }
    }

    return { success: true, message: "Notification sent successfully" };
  } catch (error) {
    console.error("❌ Error sending notification:", error);
    return { success: false, message: "Error sending notification", error: error.message };
  }
};

module.exports = sendNotification;
