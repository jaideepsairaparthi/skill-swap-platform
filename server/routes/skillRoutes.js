const express = require('express');
const { getAllSkills } = require('../controllers/skillController');
const authenticate = require('../middlewares/auth');

const router = express.Router();

// Get All Skills
router.get('/skills', authenticate, getAllSkills);

module.exports = router;