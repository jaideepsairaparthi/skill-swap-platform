const User = require('../models/userModel');

// Create or Update User
const createOrUpdateUser = async (req, res) => {
  const { firebaseUID, name, email, skillsOffered, skillsWanted, location } = req.body;

  try {
    let user = await User.findOneAndUpdate(
      { firebaseUID },
      { name, email, skillsOffered, skillsWanted, location },
      { new: true, upsert: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).json({ message: 'Error creating/updating user', error: error.message });
  }
};

// Get User by Firebase UID
const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUID: req.params.firebaseUID });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// Get All Users (with pagination, sorting, and filtering)
const getAllUsers = async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'name', order = 'asc', search = '' } = req.query;

  try {
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { skillsOffered: { $regex: search, $options: 'i' } },
        { skillsWanted: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(query)
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await User.countDocuments(query);

    res.status(200).json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Update Device Token
const updateDeviceToken = async (req, res) => {
  const { token } = req.body;
  const userId = req.user.uid;

  try {
    const user = await User.findOneAndUpdate(
      { firebaseUID: userId },
      { $addToSet: { deviceTokens: token } },
      { new: true }
    );
    res.status(200).json({ message: 'Device token updated successfully', user });
  } catch (error) {
    console.error('Error updating device token:', error);
    res.status(500).json({ message: 'Error updating device token', error: error.message });
  }
};

module.exports = {
  createOrUpdateUser,
  getUserById,
  getAllUsers,
  updateDeviceToken,
};