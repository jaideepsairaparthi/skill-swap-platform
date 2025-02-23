const express = require('express');
const { createOrUpdateUser, getUserById, getAllUsers } = require('../controllers/userController');
const authenticate = require('../middlewares/auth');

const router = express.Router();

// Protected Routes
router.post('/user', authenticate, createOrUpdateUser);
router.get('/user/:id', authenticate, getUserById);
router.get('/users', authenticate, getAllUsers);

module.exports = router;
