const Match = require('../models/Match');
const User = require('../models/userModel');
const sendNotification = require('../utils/notificationHelper');

// Request Skill Swap
const requestSkillSwap = async (req, res) => {
  const { targetUserId, skillName } = req.body;
  const requesterUserId = req.user.uid;

  try {
    if (requesterUserId === targetUserId) {
      return res.status(400).json({ message: 'You cannot request a skill swap with yourself' });
    }

    const targetUser = await User.findOne({ firebaseUID: targetUserId });
    if (!targetUser) {
      return res.status(404).json({ message: 'Target user not found' });
    }

    if (!targetUser.skillsOffered.includes(skillName)) {
      return res.status(400).json({ message: 'Target user does not offer this skill' });
    }

    const existingMatch = await Match.findOne({
      userA: requesterUserId,
      userB: targetUserId,
      skillExchanged: skillName,
      status: 'pending',
    });

    if (existingMatch) {
      return res.status(400).json({ message: 'A skill swap request already exists for this skill' });
    }

    const match = new Match({
      userA: requesterUserId,
      userB: targetUserId,
      skillExchanged: skillName,
      status: 'pending',
    });

    await match.save();

    const requester = await User.findOne({ firebaseUID: requesterUserId });
    if (!requester) {
      return res.status(404).json({ message: 'Requester user not found' });
    }

    await sendNotification(
      targetUser._id,
      'New Skill Swap Request',
      `${requester.name} wants to swap skills with you!`
    );

    res.status(200).json({ message: 'Skill swap request sent successfully', match });
  } catch (error) {
    console.error('Error requesting skill swap:', error);
    res.status(500).json({ message: 'Error requesting skill swap', error: error.message });
  }
};

// Update Skill Swap Status
const updateSkillSwapStatus = async (req, res) => {
  const { status } = req.body;
  const matchId = req.params.id;
  const userId = req.user.uid;

  try {
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    if (match.userA !== userId && match.userB !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this match' });
    }

    const updatedMatch = await Match.findByIdAndUpdate(
      matchId,
      { status },
      { new: true }
    );

    const targetUser = await User.findOne({ firebaseUID: match.userA === userId ? match.userB : match.userA });
    if (!targetUser) {
      return res.status(404).json({ message: 'Target user not found' });
    }

    await sendNotification(
      match.userA === userId ? match.userB : match.userA,
      'Skill Swap Request Updated',
      `${targetUser.name} has ${status} your request.`
    );

    res.status(200).json({ message: 'Match status updated successfully', match: updatedMatch });
  } catch (error) {
    console.error('Error updating match status:', error);
    res.status(500).json({ message: 'Error updating match status', error: error.message });
  }
};

module.exports = { requestSkillSwap, updateSkillSwapStatus };