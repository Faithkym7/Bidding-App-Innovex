// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import {getFirestore, addDoc, getDocs, collection, query, where, Timestamp} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
console.log("Initializing Firebase...");

const app = initializeApp(firebaseConfig);

if (app) {
  console.log("Firebase app initialized:", app.name); // Should log "[DEFAULT]"
} else {
  console.error("Firebase app initialization failed.");
}

const auth = getAuth(app);
const db = getFirestore(app);
//console.log("Firebase app initialized:", app.name); // Should log "[DEFAULT]" if successfully initialized

const analytics = typeof window !== "undefined" ? getAnalytics(app) : null; // Optional check for analytics in non-browser environments

export { auth, analytics , db, collection, getDocs, query, where, addDoc, Timestamp};