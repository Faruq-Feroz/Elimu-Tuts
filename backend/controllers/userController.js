// controllers/userController.js

const User = require('../models/User');
const { admin } = require('../config/firebase');

// Create or update user in MongoDB after Firebase authentication
const createOrUpdateUser = async (req, res) => {
  try {
    const { fullName, email, role, phoneNumber } = req.body;
    const { uid } = req.user;

    // Find if user already exists
    let user = await User.findOne({ firebaseUid: uid });

    if (user) {
      // Update existing user
      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.updatedAt = Date.now();
      
      await user.save();
      return res.status(200).json({ 
        success: true, 
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          profilePicture: user.profilePicture
        }
      });
    }

    // Create new user
    user = new User({
      firebaseUid: uid,
      email,
      fullName,
      role,
      phoneNumber
    });

    await user.save();
    
    return res.status(201).json({ 
      success: true, 
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error creating/updating user:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error while creating/updating user',
      error: error.message
    });
  }
};

// Get current user data
const getCurrentUser = async (req, res) => {
  try {
    const { uid } = req.user;
    
    const user = await User.findOne({ firebaseUid: uid });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        phoneNumber: user.phoneNumber
      }
    });
  } catch (error) {
    console.error('Error getting current user:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching user data',
      error: error.message
    });
  }
};

module.exports = {
  createOrUpdateUser,
  getCurrentUser
};