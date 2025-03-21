const admin = require('firebase-admin');

// Correct path to serviceAccountKey.json inside config/
const serviceAccount = require('./serviceAccountKey.json'); 

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "elimu-tuts.appspot.com" // Add this if using Firebase Storage
});

// Export Firebase Admin instance
module.exports = { admin };
