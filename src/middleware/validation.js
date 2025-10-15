const validator = require('validator');

const validateRegistration = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (username.length < 3 || username.length > 30) {
    return res.status(400).json({ message: 'Username must be between 3 and 30 characters' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  next();
};

const validateOTP = (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!validator.isNumeric(otp) || otp.length !== 6) {
    return res.status(400).json({ message: 'OTP must be a 6-digit number' });
  }

  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateOTP
};