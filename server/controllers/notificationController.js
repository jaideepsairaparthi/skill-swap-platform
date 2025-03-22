const sendNotification = require("../utils/notificationHelper");
const Notification = require("../models/Notification");

const sendNotificationController = async (req, res) => {
  const { userId, title, body } = req.body;

  try {
    await sendNotification(userId, title, body);
    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ message: "Error sending notification", error: error.message });
  }
};

const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.firebaseUID;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Error fetching notifications", error: error.message });
  }
};

const markNotificationAsRead = async (req, res) => {
  console.log("Received Request:", req.method, req.url);
  console.log("Request Params:", req.params);
  console.log("Received messageId:", req.params.id); // Debugging

  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Invalid notification ID format" });
    }

    // Find the notification by messageId
    const notification = await Notification.findOne({ messageId: id });

    if (!notification) {
      console.log("Notification not found in database. messageId:", id);
      return res.status(404).json({ message: "Notification not found" });
    }

    // Mark as read
    notification.read = true;
    await notification.save();

    console.log("Notification marked as read:", notification);
    res.status(200).json({ message: "Notification marked as read", notification });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Error marking notification as read", error: error.message });
  }
};

module.exports = { sendNotification: sendNotificationController, getUserNotifications, markNotificationAsRead };
