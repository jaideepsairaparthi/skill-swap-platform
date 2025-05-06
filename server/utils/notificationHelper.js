const admin = require("firebase-admin");
const User = require("../models/userModel");
const Notification = require("../models/Notification");

const sendNotification = async (userId, title, body) => {
  try {
    console.log(`📤 Attempting to send notification to user ${userId}`);
    
    const user = await User.findOne({ firebaseUID: userId });
    if (!user) {
      console.log("⚠️ User not found");
      return { 
        success: false, 
        message: "User not found" 
      };
    }

    if (!user.deviceTokens || user.deviceTokens.length === 0) {
      console.log("⚠️ No device tokens available for user");
      return { 
        success: false, 
        message: "No device tokens available" 
      };
    }

    console.log(`📱 Found ${user.deviceTokens.length} device tokens for user`);

    const message = {
      tokens: user.deviceTokens,
      notification: { title, body },
      data: {
        userId,
        notificationType: "skillRequest",
        click_action: "FLUTTER_NOTIFICATION_CLICK"
      }
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    console.log("🔥 FCM response:", JSON.stringify(response, null, 2));

    let anySuccess = false;
    const savedNotifications = [];

    for (const [index, resp] of response.responses.entries()) {
      if (resp.success && resp.messageId) {
        anySuccess = true;
        const messageId = `projects/skillswap-3f118/messages/${resp.messageId}`;

        // Check for existing notification
        const existingNotification = await Notification.findOne({ messageId });
        if (!existingNotification) {
          const notification = new Notification({
            messageId,
            userId,
            title,
            body,
            read: false
          });

          await notification.save();
          savedNotifications.push(notification);
          console.log(`✅ Notification saved for device ${index}:`, notification._id);
        } else {
          console.log(`⚠️ Notification already exists:`, existingNotification._id);
          savedNotifications.push(existingNotification);
        }
      } else if (resp.error) {
        console.error(`❌ Error sending to token ${index}:`, resp.error.message);
      }
    }

    if (!anySuccess) {
      return { 
        success: false, 
        message: "Failed to send notification to all devices" 
      };
    }

    return { 
      success: true,
      message: "Notification sent successfully",
      notifications: savedNotifications
    };
  } catch (error) {
    console.error("❌ Error in sendNotification:", error);
    return { 
      success: false, 
      message: "Error sending notification",
      error: error.message 
    };
  }
};

module.exports = sendNotification;