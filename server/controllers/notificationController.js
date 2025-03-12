const sendNotification = require('../utils/notificationHelper');

// Send Notification
const sendNotificationController = async (req, res) => {
  const { userId, title, body } = req.body;

  try {
    await sendNotification(userId, title, body);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ message: 'Error sending notification', error: error.message });
  }
};

module.exports = { sendNotification: sendNotificationController };