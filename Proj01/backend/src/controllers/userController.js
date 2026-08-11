const User = require('../models/User');

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
      res.json({
        success: true,
        user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User profile not found.',
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email ? req.body.email.toLowerCase() : user.email;
      user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        success: true,
        message: 'Profile updated successfully!',
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          bio: updatedUser.bio,
          role: updatedUser.role,
          updatedAt: updatedUser.updatedAt,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User profile not found.',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
