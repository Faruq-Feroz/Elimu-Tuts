// middleware/firebaseAuth.js

const { admin } = require('../config/firebase');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Auth header present:', !!authHeader);
    
    const token = authHeader?.split('Bearer ')[1];
    console.log('Token extracted:', !!token);
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token provided' });
    }
    
    console.log('Verifying token with Firebase...');
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log('Token verified successfully. User:', decodedToken.email);
    
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying token:', error.code, error.message);
    return res.status(403).json({ 
      message: 'Invalid or expired token', 
      details: error.message
    });
  }
};

module.exports = { verifyToken };
