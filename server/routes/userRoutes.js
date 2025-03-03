const express = require('express');
const { body, param } = require('express-validator');
const { createOrUpdateUser, getUserById, getAllUsers } = require('../controllers/userController');
const authenticate = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { requestSkillSwap } = require('../controllers/skillSwapController');

const router = express.Router();

// Create or Update User
router.post(
  '/user',
  authenticate,
  validate([
    body('firebaseUID').notEmpty().withMessage('Firebase UID is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('skillsOffered').isArray().withMessage('skillsOffered must be an array'), // Validate skillsOffered
    body('skillsWanted').isArray().withMessage('skillsWanted must be an array'),   // Validate skillsWanted
  ]),
  createOrUpdateUser
);

// Get User by Firebase UID
router.get(
  '/user/:firebaseUID',
  authenticate,
  validate([param('firebaseUID').notEmpty().withMessage('Firebase UID is required')]),
  getUserById
);

// Get All Users (with pagination)
router.get('/users', authenticate, getAllUsers);

// Request Skill Swap
router.post(
  '/skill-swap/request',
  authenticate,
  validate([
    body('targetUserId').notEmpty().withMessage('Target user ID is required'),
    body('skillId').notEmpty().withMessage('Skill ID is required'),
  ]),
  requestSkillSwap
);

module.exports = router;