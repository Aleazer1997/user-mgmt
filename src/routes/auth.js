const express = require('express');
const passport = require('passport');
const {
  register,
  verifyAccount,
  login,
  refreshToken,
  logout,
  googleAuthCallback
} = require('../controllers/authController');
const {
  validateRegistration,
  validateLogin,
  validateOTP
} = require('../middleware/validation');

const router = express.Router();

// Registration
router.post('/register', validateRegistration, register);

// Email verification
router.post('/verify', validateOTP, verifyAccount);

// Login
router.post('/login', validateLogin, login);

// Token refresh
router.post('/refresh-token', refreshToken);

// Logout
router.post('/logout', logout);

// Google OAuth
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  googleAuthCallback
);

module.exports = router;