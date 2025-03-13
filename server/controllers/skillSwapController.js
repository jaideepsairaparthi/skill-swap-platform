const Match = require('../models/Match');
const User = require('../models/userModel');
const sendNotification = require('../utils/notificationHelper');

// Request Skill Swap
const requestSkillSwap = async (req, res) => {
  const { targetUserId, skillName } = req.body; // Use skillName instead of skillId
  const requesterUserId = req.user.uid; // Firebase UID of the requester

  try {
    // Check if the requester and target user are the same
    if (requesterUserId === targetUserId) {
      return res.status(400).json({ message: 'You cannot request a skill swap with yourself' });
    }

    // Check if the target user exists
    const targetUser = await User.findOne({ firebaseUID: targetUserId });
    if (!targetUser) {
      return res.status(404).json({ message: 'Target user not found' });
    }

    // Check if the skill exists in the target user's offered skills
    if (!targetUser.skillsOffered.includes(skillName)) {
      return res.status(400).json({ message: 'Target user does not offer this skill' });
    }

    // Check for duplicate match requests
    const existingMatch = await Match.findOne({
      userA: requesterUserId,
      userB: targetUserId,
      skillExchanged: skillName, // Use skillName instead of skillId
      status: 'pending',
    });

    if (existingMatch) {
      return res.status(400).json({ message: 'A skill swap request already exists for this skill' });
    }

    // Create a new match request
    const match = new Match({
      userA: requesterUserId, // Firebase UID of the requester
      userB: targetUserId,   // Firebase UID of the target user
      skillExchanged: skillName, // Use skillName instead of skillId
      status: 'pending',
    });

    await match.save();

    // Send notification to the target user
    const requester = await User.findOne({ firebaseUID: requesterUserId });
    if (!requester) {
      return res.status(404).json({ message: 'Requester user not found' });
    }

    await sendNotification(
      targetUser._id, // Target user's MongoDB ID
      'New Skill Swap Request',
      `${requester.name} wants to swap skills with you!`
    );

    res.status(200).json({ message: 'Skill swap request sent successfully', match });
  } catch (error) {
    console.error('Error requesting skill swap:', error);
    res.status(500).json({ message: 'Error requesting skill swap', error: error.message });
  }
};

module.exports = { requestSkillSwap };