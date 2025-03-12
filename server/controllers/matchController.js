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

module.exports = { getMatchesByUserId };