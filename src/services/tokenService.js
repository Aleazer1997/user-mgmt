const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateAccessToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' }
  );
};

const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' }
  );
};

const verifyRefreshToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    if (decoded.type !== 'refresh') {
      throw new Error('Invalid token type');
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Check if refresh token exists in user's refresh tokens
    const tokenExists = user.refreshTokens.some(token => token.token === refreshToken);
    if (!tokenExists) {
      throw new Error('Refresh token not found');
    }

    return decoded;
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

const saveRefreshToken = async (userId, refreshToken) => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

  await User.findByIdAndUpdate(userId, {
    $push: {
      refreshTokens: {
        token: refreshToken,
        expiresAt
      }
    }
  });
};

const removeRefreshToken = async (userId, refreshToken) => {
  await User.findByIdAndUpdate(userId, {
    $pull: {
      refreshTokens: { token: refreshToken }
    }
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  saveRefreshToken,
  removeRefreshToken
};