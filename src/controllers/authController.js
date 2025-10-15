const User = require('../models/User');
const { sendOTPEmail } = require('../services/emailService');
const { generateOTP, saveOTP, verifyOTP } = require('../services/otpService');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  saveRefreshToken,
  removeRefreshToken
} = require('../services/tokenService');

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(409).json({
        message: 'User with this email or username already exists'
      });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      isVerified: false,
      authProvider: 'local'
    });

    await user.save();

    // Generate and send OTP
    const otp = generateOTP();
    await saveOTP(email, otp);
    await sendOTPEmail(email, otp);

    res.status(201).json({
      message: 'User registered successfully. Please check your email for verification OTP.',
      userId: user._id
    });
  } catch (error) {
    next(error);
  }
};

const verifyAccount = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const verificationResult = await verifyOTP(email, otp);

    if (!verificationResult.isValid) {
      return res.status(400).json({ message: verificationResult.message });
    }

    // Update user verification status
    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Account verified successfully' });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your account before logging in' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token
    await saveRefreshToken(user._id, refreshToken);

    res.json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: user.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    const decoded = await verifyRefreshToken(refreshToken);
    const newAccessToken = generateAccessToken(decoded.userId);

    res.json({
      accessToken: newAccessToken
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      await removeRefreshToken(decoded.userId, refreshToken);
    }

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid refresh token' });
  }
};

const googleAuthCallback = async (req, res, next) => {
  try {
    const user = req.user;

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token
    await saveRefreshToken(user._id, refreshToken);

    // Redirect or send tokens
    res.redirect(`${process.env.CLIENT_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  verifyAccount,
  login,
  refreshToken,
  logout,
  googleAuthCallback
};