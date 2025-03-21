const sendNotification = require('../utils/notificationHelper');
const Notification = require('../models/Notification');

// ✅ Send Notification
const sendNotificationController = async (req, res) => {
  const { userId, title, body } = req.body;

  try {
    await sendNotification(userId, title, body);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error('❌ Error sending notification:', error);
    res.status(500).json({ message: 'Error sending notification', error: error.message });
  }
};

// ✅ Fetch Notifications for a User
const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.firebaseUID;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ notifications });
  } catch (error) {
    console.error('❌ Error fetching notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
};

//  Mark Notification as Read (Decode messageId)
const markNotificationAsRead = async (req, res) => {
  console.log("Received Request:", req.method, req.url);
  console.log("Request Params:", req.params);
  console.log("Received ID:", req.params.id);

  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Invalid notification ID format" });
    }

    const updatedNotification = await Notification.findOneAndUpdate(
      { messageId: id },
      { read: true },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    console.log("✅ Notification marked as read:", updatedNotification);
    res.status(200).json({ message: "Notification marked as read", notification: updatedNotification });
  } catch (error) {
    console.error("❌ Error marking notification as read:", error);
    res.status(500).json({ message: "Error marking notification as read", error: error.message });
  }
};

module.exports = { 
  sendNotification: sendNotificationController, 
  getUserNotifications, 
  markNotificationAsRead 
};
