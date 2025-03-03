const User = require('../models/userModel');

// Create or Update User
const createOrUpdateUser = async (req, res) => {
  const { firebaseUID, name, email, skillsOffered, skillsWanted } = req.body;

  try {
    let user = await User.findOneAndUpdate(
      { firebaseUID },
      { name, email, skillsOffered, skillsWanted }, // Include skillsOffered and skillsWanted
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

// Get All Users (with pagination)
const getAllUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await User.countDocuments();

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

// Export all functions
module.exports = {
  createOrUpdateUser,
  getUserById,
  getAllUsers,
};