const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const { authenticateJWT } = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.get('/:id', authenticateJWT, getProfile);
router.put('/:id', authenticateJWT, updateProfile);

module.exports = router;