const express = require('express');
const { param,body } = require('express-validator');
const { getMatchesByUserId,updateMatchStatus } = require('../controllers/matchController');
const authenticate = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { startVideoCall } = require('../controllers/matchController');

const router = express.Router();

// Get Matches for a User
router.get(
  '/matches/:userId',
  authenticate,
  validate([param('userId').notEmpty().withMessage('User ID is required')]),
  getMatchesByUserId
);

router.post(
  '/matches/:matchId/start-call',
  authenticate,
  startVideoCall
);

router.patch(
  '/matches/:matchId/status',
  authenticate,
  validate([
    body('status')
      .notEmpty().withMessage('Status is required')
      .isIn(['pending', 'accepted', 'completed']).withMessage('Invalid status')
  ]),
  updateMatchStatus
);


module.exports = router;