const Match = require('../models/Match');

// Get Matches for a User
const getMatchesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const matches = await Match.find({
      $or: [{ userA: userId }, { userB: userId }],
    });
    res.status(200).json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ message: 'Error fetching matches', error: error.message });
  }
};

// controllers/matchController.js
const startVideoCall = async (req, res) => {
  try {
    const { matchId } = req.params;
    const userId = req.user.uid;
    
    // Verify the user is part of this match
    const match = await Match.findOne({
      _id: matchId,
      $or: [{ userA: userId }, { userB: userId }],
      status: 'accepted' // Only allow calls for accepted matches
    });

    if (!match) {
      return res.status(403).json({ 
        error: "You can only start calls for accepted matches you're part of" 
      });
    }

    // Generate a unique room ID
    const roomId = `match-${matchId}-${Date.now()}`;
    
    // Add to call history
    match.callHistory.push({ 
      roomId,
      startedAt: new Date() 
    });
    await match.save();

    res.json({ roomId });
  } catch (error) {
    console.error('Error starting video call:', error);
    res.status(500).json({ error: error.message });
  }
};

const updateMatchStatus = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { status } = req.body;
    const userId = req.user.uid;

    // Validate status
    if (!['pending', 'accepted', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    // Find and update match
    const match = await Match.findOneAndUpdate(
      {
        _id: matchId,
        $or: [{ userA: userId }, { userB: userId }]
      },
      { status },
      { new: true, runValidators: true }
    );

    if (!match) {
      return res.status(404).json({ error: 'Match not found or unauthorized' });
    }

    res.json({
      success: true,
      match,
      message: `Match status updated to ${status}`
    });

  } catch (error) {
    console.error('Error updating match status:', error);
    res.status(500).json({ 
      error: error.message,
      message: 'Failed to update match status' 
    });
  }
};

module.exports = {
  getMatchesByUserId,
  startVideoCall,
  updateMatchStatus
};
