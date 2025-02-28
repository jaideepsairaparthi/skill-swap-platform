const User = require('../models/userModel');
const Match = require('../models/Match');

const requestSkillSwap = async (req, res) => {
  const { targetUserId, skillId } = req.body;
  const requesterUserId = req.user.uid; // Firebase UID of the requester

  try {
    // Check if the target user exists
    const targetUser = await User.findOne({ firebaseUID: targetUserId });
    if (!targetUser) {
      return res.status(404).json({ message: 'Target user not found' });
    }

    // Create a new match request
    const match = new Match({
      userA: requesterUserId, // Firebase UID of the requester
      userB: targetUserId,    // Firebase UID of the target user
      skillExchanged: skillId,
      status: 'pending',
    });

    await match.save();
    res.status(200).json({ message: 'Skill swap request sent successfully', match });
  } catch (error) {
    res.status(500).json({ message: 'Error requesting skill swap', error });
  }
};

module.exports = { requestSkillSwap };