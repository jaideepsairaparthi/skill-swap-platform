const User = require('../models/userModel');

// Create or Update User
const createOrUpdateUser = async (req, res) => {
  const { firebaseUID, name, email, skills } = req.body;

  try {
    let user = await User.findOneAndUpdate(
      { firebaseUID },
      { name, email, skills },
      { new: true, upsert: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating/updating user', error });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUID: req.params.id });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};


// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Export all functions
module.exports = {
  createOrUpdateUser,
  getUserById,
  getAllUsers,
};
