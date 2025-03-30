const admin = require('firebase-admin');

// Initialize Firebase Admin with either environment variables or service account file
let firebaseConfig;

// Check if environment variables are available (for production/Render)
if (process.env.FIREBASE_PROJECT_ID) {
  console.log('Using Firebase credentials from environment variables');
  firebaseConfig = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
  };
} else {
  // Fallback to file for local development
  try {
    console.log('Using Firebase credentials from serviceAccountKey.json');
    firebaseConfig = require('./serviceAccountKey.json');
  } catch (error) {
    console.error('Firebase credentials not found. Please set up environment variables or create serviceAccountKey.json');
    process.exit(1);
  }
}

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "elimu-tuts.appspot.com" // Use env var if available
});

// Export Firebase Admin instance
module.exports = { admin };