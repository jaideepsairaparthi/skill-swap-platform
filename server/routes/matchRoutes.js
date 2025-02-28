const express = require('express');
const authenticate = require('../middlewares/auth');
const Match = require('../models/Match'); // Import the Match model

const router = express.Router();

// Match Status Update Route
router.patch('/match/:id', authenticate, async (req, res) => {
  const { status } = req.body;
  try {
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json({ message: 'Match status updated successfully', match });
  } catch (error) {
    res.status(500).json({ message: 'Error updating match status', error });
  }
});

module.exports = router;