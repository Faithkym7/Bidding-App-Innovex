import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAerepJSwM9_2IZI_eezsRUSPnpI_LWmu4",
  authDomain: "bidding-bee37.firebaseapp.com",
  projectId: "bidding-bee37",
  storageBucket: "bidding-bee37.firebasestorage.app",
  messagingSenderId: "328103900161",
  appId: "1:328103900161:web:23378d247a4bb9e75d7c00",
  measurementId: "G-MKHYN1N6HE"
};

// Ensure only one app instance
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
