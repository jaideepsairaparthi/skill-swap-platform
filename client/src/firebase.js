// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAlBB_FDPlYayxYU7Zg9VMx4Le_6mVUeM",
  authDomain: "skillswap-3f118.firebaseapp.com",
  projectId: "skillswap-3f118",
  storageBucket: "skillswap-3f118.firebasestorage.app",
  messagingSenderId: "125804310523",
  appId: "1:125804310523:web:8afb8222fe2aac1976e55e"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const messaging = getMessaging(app); // Initialize Firebase Messaging

export { app, auth, provider, messaging }; // Export messaging