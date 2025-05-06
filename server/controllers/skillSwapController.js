const Match = require('../models/Match');
const User = require('../models/userModel');
const sendNotification = require('../utils/notificationHelper');

const requestSkillSwap = async (req, res) => {
  const { targetUserId, skillName } = req.body;
  const requesterUserId = req.user.uid;

  try {
    // Find both users
    const [targetUser, requester] = await Promise.all([
      User.findOne({ firebaseUID: targetUserId }),
      User.findOne({ firebaseUID: requesterUserId })
    ]);

    if (!targetUser || !requester) {
      return res.status(404).json({ 
        message: targetUser ? 'Requester not found' : 'Target user not found' 
      });
    }

    // Validate target user's skills
    if (!Array.isArray(targetUser.skillsOffered) ){
      return res.status(400).json({ message: 'Target user has no skills offered' });
    }

    const skillExists = targetUser.skillsOffered.some(
      skill => skill.toLowerCase() === skillName.toLowerCase()
    );
    
    if (!skillExists) {
      return res.status(400).json({ message: 'Target user does not offer this skill' });
    }

    // Check for existing request
    const existingMatch = await Match.findOne({
      $or: [
        { 
          userA: requesterUserId, 
          userB: targetUserId, 
          skillExchanged: skillName, 
          status: 'pending' 
        },
        { 
          userA: targetUserId, 
          userB: requesterUserId, 
          skillExchanged: skillName, 
          status: 'pending' 
        }
      ]
    });

    if (existingMatch) {
      return res.status(400).json({ 
        message: 'A pending skill swap request already exists' 
      });
    }

    // Create and save new match
    const match = await Match.create({
      userA: requesterUserId,
      userB: targetUserId,
      skillExchanged: skillName,
      status: 'pending',
      requestedAt: new Date()
    });

    // Send notification
    await sendNotification(
      targetUser._id,
      'New Skill Swap Request',
      `${requester.name} wants to learn ${skillName} from you!`
    );

    return res.status(201).json({ 
      success: true,
      message: 'Skill swap request sent successfully',
      data: match
    });

  } catch (error) {
    console.error('Error requesting skill swap:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: error.message 
    });
  }
};

module.exports = { requestSkillSwap };