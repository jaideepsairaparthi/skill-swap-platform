const express = require('express');
const { param } = require('express-validator');
const { getMatchesByUserId } = require('../controllers/matchController');
const authenticate = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = express.Router();

// Get Matches for a User
router.get(
  '/matches/:userId',
  authenticate,
  validate([param('userId').notEmpty().withMessage('User ID is required')]),
  getMatchesByUserId
);

module.exports = router;