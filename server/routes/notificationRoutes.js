const express = require("express");
const { body } = require("express-validator");
const {
  sendNotification,
  getUserNotifications,
  markNotificationAsRead,
} = require("../controllers/notificationController");
const authenticate = require("../middlewares/auth");
const validate = require("../middlewares/validate");

const router = express.Router();

// Send notification to specific user
router.post(
  "/notifications",
  authenticate,
  validate([
    body("userId").notEmpty().withMessage("User ID is required"),
    body("title").notEmpty().withMessage("Title is required"),
    body("body").notEmpty().withMessage("Body is required"),
  ]),
  sendNotification
);

// Get notifications for current authenticated user
router.get("/notifications", authenticate, getUserNotifications);

// Mark notification as read - with explicit OPTIONS handler
router.route("/notifications/:id/read")
  .options((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.status(200).end();
  })
  .patch(authenticate, markNotificationAsRead);

module.exports = router;