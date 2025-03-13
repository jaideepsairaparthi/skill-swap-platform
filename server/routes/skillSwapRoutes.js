const express = require('express');
const { body } = require('express-validator');
const { requestSkillSwap } = require('../controllers/skillSwapController');
const authenticate = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = express.Router();

// Request Skill Swap
router.post(
  '/skill-swap/request',
  authenticate,
  validate([
    body('targetUserId').notEmpty().withMessage('Target user ID is required'),
    body('skillName').notEmpty().withMessage('Skill name is required'),
  ]),
  requestSkillSwap
);

module.exports = router;