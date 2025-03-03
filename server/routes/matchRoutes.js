const express = require('express');
const { body, param } = require('express-validator');
const authenticate = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const Match = require('../models/Match'); // Import the Match model

const router = express.Router();

// Match Status Update Route
router.patch(
  '/match/:id',
  authenticate,
  validate([
    param('id').notEmpty().withMessage('Match ID is required'),
    body('status')
      .notEmpty().withMessage('Status is required')
      .isIn(['pending', 'accepted', 'completed']).withMessage('Invalid status'),
  ]),
  async (req, res) => {
    const { status } = req.body;
    const matchId = req.params.id;
    const userId = req.user.uid; // Firebase UID of the authenticated user

    try {
      // Find the match
      const match = await Match.findById(matchId);
      if (!match) {
        return res.status(404).json({ message: 'Match not found' });
      }

      // Check if the authenticated user is involved in the match
      if (match.userA !== userId && match.userB !== userId) {
        return res.status(403).json({ message: 'You are not authorized to update this match' });
      }

      // Update the match status
      const updatedMatch = await Match.findByIdAndUpdate(
        matchId,
        { status },
        { new: true }
      );

      res.status(200).json({ message: 'Match status updated successfully', match: updatedMatch });
    } catch (error) {
      console.error('Error updating match status:', error);
      res.status(500).json({ message: 'Error updating match status', error: error.message });
    }
  }
);

module.exports = router;