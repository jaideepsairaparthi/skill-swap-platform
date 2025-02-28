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
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('skills').isArray().withMessage('Skills must be an array'),
  ]),
  createOrUpdateUser
);

// Get User by ID
router.get(
  '/user/:id',
  authenticate,
  validate([param('id').notEmpty().withMessage('User ID is required')]),
  getUserById
);

// Get All Users
router.get('/users', authenticate, getAllUsers);

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