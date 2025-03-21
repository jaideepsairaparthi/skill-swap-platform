const express = require('express');
const { body } = require('express-validator');
const { sendNotification } = require('../controllers/notificationController');
const authenticate = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { getUserNotifications } = require('../controllers/notificationController');
const { markNotificationAsRead } = require('../controllers/notificationController');
const router = express.Router();

// Send Notification
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

router.get('/notifications', authenticate, getUserNotifications);
router.patch('/notifications/:notificationId/read', authenticate, markNotificationAsRead);


module.exports = router;