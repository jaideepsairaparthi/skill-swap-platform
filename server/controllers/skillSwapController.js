const Match = require('../models/Match');
const User = require('../models/userModel');
const sendNotification = require('../utils/notificationHelper');

const requestSkillSwap = async (req, res) => {
  console.log("Incoming Request Body:", req.body); // Debugging
  console.log("Authenticated User UID:", req.user.uid); // Debugging

  const { targetUserId, skillName } = req.body;
  const requesterUserId = req.user.uid;

  try {
    if (!targetUserId || !skillName) {
      return res.status(400).json({ message: 'Both targetUserId and skillName are required' });
    }

    if (requesterUserId === targetUserId) {
      return res.status(400).json({ message: 'You cannot request a skill swap with yourself' });
    }

    const targetUser = await User.findOne({ firebaseUID: targetUserId });
    if (!targetUser) {
      return res.status(404).json({ message: 'Target user not found' });
    }

    // Ensure skillsOffered exists to prevent crashes
    if (!Array.isArray(targetUser.skillsOffered)) {
      return res.status(400).json({ message: 'Target user has no skills offered' });
    }

    // Check if the target user offers the skill
    const skillExists = targetUser.skillsOffered.some(
      (skill) => skill.toLowerCase() === skillName.toLowerCase()
    );
    if (!skillExists) {
      return res.status(400).json({ message: 'Target user does not offer this skill' });
    }

    // Check if a pending request exists
    const existingMatch = await Match.findOne({
      $or: [
        { userA: requesterUserId, userB: targetUserId, skillExchanged: skillName, status: 'pending' },
        { userA: targetUserId, userB: requesterUserId, skillExchanged: skillName, status: 'pending' },
      ],
    });

    if (existingMatch) {
      return res.status(400).json({ message: 'A pending skill swap request already exists' });
    }

    // Create new skill swap request
    const match = new Match({
      userA: requesterUserId,
      userB: targetUserId,
      skillExchanged: skillName,
      status: 'pending',
    });

    await match.save();

    // Fetch the requester user
    const requester = await User.findOne({ firebaseUID: requesterUserId });
    if (!requester) {
      return res.status(404).json({ message: 'Requester user not found' });
    }

    // Send notification
    await sendNotification(
      targetUser._id,
      'New Skill Swap Request',
      `${requester.name} wants to swap skills with you!`
    );

    res.status(200).json({ message: 'Skill swap request sent successfully', match });
  } catch (error) {
    console.error('Error requesting skill swap:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = { requestSkillSwap };
