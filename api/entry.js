import { initializeApp } from 'firebase/app';
import { credential, auth } from 'firebase-admin';
// import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore/lite';
import dotenv from 'dotenv';
import express from 'express';
import { serviceAccount } from 'path/to/serviceAccountKey.json'; // Replace with your service account key file

// Expose .env file variables in process.env
const env = dotenv.config().parsed;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
};

initializeApp({
  credential: credential.cert(serviceAccount),
  ...firebaseConfig,
});

const app = express();

// Middleware to authenticate Firebase tokens
app.use(async (req, res, next) => {
  const idToken = req.headers.authorization;

  try {
    const decodedToken = await auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Sample protected route
app.get('/api/protected', (req, res) => {
  if (!req.user) {
    res.json({ message: 'This is a protected route.', user: req.user });
  }
  res.json({ message: 'Access granted' }); 
});

const port = env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});