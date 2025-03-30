# Firebase Configuration

## Local Development Setup

To run this application locally, you need to set up Firebase credentials:

1. Create a `serviceAccountKey.json` file in this directory using the structure in `serviceAccountKey.template.json`
2. Get your Firebase project credentials from the Firebase Console:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save the downloaded JSON file as `serviceAccountKey.json` in this directory

**IMPORTANT: Never commit the `serviceAccountKey.json` file to Git!** It contains sensitive credentials.

## Production Deployment (Render)

For production deployment, set the following environment variables in your Render dashboard:

- `FIREBASE_TYPE` - From your serviceAccountKey.json
- `FIREBASE_PROJECT_ID` - Firebase project ID
- `FIREBASE_PRIVATE_KEY_ID` - Private key ID
- `FIREBASE_PRIVATE_KEY` - The entire private key (with newlines)
- `FIREBASE_CLIENT_EMAIL` - Service account email
- `FIREBASE_CLIENT_ID` - Client ID
- `FIREBASE_AUTH_URI` - Auth URI
- `FIREBASE_TOKEN_URI` - Token URI
- `FIREBASE_AUTH_PROVIDER_CERT_URL` - Auth provider cert URL
- `FIREBASE_CLIENT_CERT_URL` - Client cert URL
- `FIREBASE_STORAGE_BUCKET` - Your storage bucket name (optional)

The application will automatically use these environment variables in production and fall back to the local file in development. 