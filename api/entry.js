/* eslint-disable no-undef */
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore/lite'; // Import getDocs
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'; // Import cors

// Load environment variables from .env file
dotenv.config();

// Create an object with Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Get Firebase Authentication instance
const auth = getAuth(firebaseApp); // todo

// Initialize Firestore before using it
const firestore = getFirestore();

const app = express();

app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Example: User Registration
app.post('/api/register', async (req, res) => { // todo
  const { email, password } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    res.json({ message: 'User registered', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Example: User Login
app.post('/api/login', async (req, res) => { // todo
  const { email, password } = req.body;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    res.json({ message: 'User logged in', user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

app.post('/api/add-sample-data', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const sampleData = {
      name,
      age,
      email,
    };
    console.log(sampleData);

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
