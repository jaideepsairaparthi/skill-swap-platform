const express = require('express');
const { body } = require('express-validator');
const {
  sendNotification,
  getUserNotifications,
  markNotificationAsRead,
} = require('../controllers/notificationController');
const authenticate = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post(
  '/notifications',
  authenticate,
  validate([
    body('userId').notEmpty().withMessage('User ID is required'),
    body('title').notEmpty().withMessage('Title is required'),
    body('body').notEmpty().withMessage('Body is required'),
  ]),
  sendNotification
);

// ✅ Get User Notifications
router.get('/notifications', authenticate, getUserNotifications);

// ✅ Mark Notification as Read (Decode `encodedId`)
router.patch('/notifications/:id/read', authenticate, markNotificationAsRead);


module.exports = router;
