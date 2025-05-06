const sendNotification = require("../utils/notificationHelper");
const Notification = require("../models/Notification");

const sendNotificationController = async (req, res) => {
  const { userId, title, body } = req.body;

  try {
    // Allow admins to send to any user, or users to send to themselves
    if (req.user.uid !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        message: "Unauthorized to send notifications to this user" 
      });
    }

    const result = await sendNotification(userId, title, body);

    if (result.success) {
      res.status(200).json({ 
        success: true,
        message: "Notification sent successfully",
        notification: result.notification 
      });
    } else {
      res.status(400).json({ 
        success: false,
        message: result.message 
      });
    }
  } catch (error) {
    console.error("Controller error sending notification:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error", 
      error: error.message 
    });
  }
};

const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.uid;
    
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ 
      success: true,
      notifications: notifications.map(notif => ({
        ...notif,
        _id: notif._id.toString(),
        messageId: notif.messageId,
        timestamp: notif.createdAt ? new Date(notif.createdAt).getTime() : Date.now()
      }))
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
};

const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.uid;

    const notification = await Notification.findOneAndUpdate(
      { 
        $or: [
          { _id: id, userId },
          { messageId: id, userId }
        ]
      },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ 
        success: false,
        message: "Notification not found or unauthorized" 
      });
    }

    res.status(200).json({ 
      success: true,
      message: "Notification marked as read",
      notification 
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
};

module.exports = { 
  sendNotification: sendNotificationController, 
  getUserNotifications, 
  markNotificationAsRead 
};