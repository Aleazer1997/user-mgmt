const User = require('../models/User');

const getProfile = async (req, res, next) => {
  try {
    const userId = req.params.id;
    
    // Users can only access their own profile
    if (userId !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: user.toJSON() });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;

    // Users can only update their own profile
    if (userId !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Check if username or email already exists
    if (username || email) {
      const existingUser = await User.findOne({
        $and: [
          { _id: { $ne: userId } },
          { $or: [{ email }, { username }] }
        ]
      });

      if (existingUser) {
        return res.status(409).json({
          message: 'Username or email already exists'
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { username, email } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile
};