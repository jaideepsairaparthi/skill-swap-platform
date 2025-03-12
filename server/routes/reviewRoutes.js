const express = require('express');
const { body } = require('express-validator');
const { addReview } = require('../controllers/reviewController');
const authenticate = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = express.Router();

// Add Review
router.post(
  '/reviews',
  authenticate,
  validate([
    body('userId').notEmpty().withMessage('User ID is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().isString().withMessage('Comment must be a string'),
  ]),
  addReview
);

module.exports = router;