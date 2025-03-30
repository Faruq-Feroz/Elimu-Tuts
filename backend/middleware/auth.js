const admin = require('firebase-admin');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ 
        success: false, 
        error: 'No token, authorization denied' 
      });
    }

    console.log('Token received:', token.substring(0, 20) + '...');

    // Verify token
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log('Token verified successfully for user:', decodedToken.uid);
    console.log('Token expires at:', new Date(decodedToken.exp * 1000).toISOString());

    // Add user from payload
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ 
        success: false, 
        error: 'Your session has expired. Please log in again.' 
      });
    }
    res.status(401).json({ 
      success: false, 
      error: 'Token is not valid' 
    });
  }
};

module.exports = { auth }; 