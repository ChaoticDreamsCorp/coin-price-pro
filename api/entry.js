import { initializeApp } from 'firebase/app';
import firebaseAdmin from 'firebase-admin'; // Import the default export
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore/lite';
import dotenv from 'dotenv';
import express from 'express';
import { Firestore, collection, addDoc, getDocs } from 'firebase/firestore/lite';

// Load environment variables from .env file
dotenv.config();

// Create an object with Firebase service account credentials
const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

// Create an object with Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
// Initialize Firebase app before configuring Firestore
const firebaseApp = initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  ...firebaseConfig,
});

const app = express();

// Middleware to authenticate Firebase tokens
app.use(async (req, res, next) => {
  const idToken = req.headers.authorization;

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken); // Access auth from firebaseAdmin
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

const firestore = getFirestore();
connectFirestoreEmulator(firestore, 'localhost', 5002); // Connect to the emulated Firestore

// Initialize Firebase app after configuring Firebase
initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount), // Access credential from firebaseAdmin
  ...firebaseConfig,
});

app.post('/api/add-sample-data', async (req, res) => {
  try {
    const sampleData = {
      name: 'John Doe',
      age: 30,
      email: 'johndoe@example.com',
    };

    const docRef = await addDoc(collection(firestore, 'sampleData'), sampleData);
    res.json({ message: 'Sample data added', docId: docRef.id });
  } catch (error) {
    console.error('Error adding document: ', error);
    res.status(500).json({ error: 'Error adding sample data' });
  }
});

app.get('/api/get-sample-data', async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'sampleData'));
    const sampleDataArray = [];

    querySnapshot.forEach((doc) => {
      sampleDataArray.push(doc.data());
    });

    res.json(sampleDataArray);
  } catch (error) {
    console.error('Error getting documents: ', error);
    res.status(500).json({ error: 'Error getting sample data' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
