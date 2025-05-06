import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDAlBB_FDPlYayxYU7Zg9VMx4Le_6mVUeM",
  authDomain: "skillswap-3f118.firebaseapp.com",
  projectId: "skillswap-3f118",
  storageBucket: "skillswap-3f118.appspot.com",
  messagingSenderId: "125804310523",
  appId: "1:125804310523:web:8afb8222fe2aac1976e55e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const messaging = getMessaging(app);

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(reg => {
      console.log('Service Worker registered:', reg.scope);
    })
    .catch(err => {
      console.error('Service Worker registration failed:', err);
    });
}

export { app, auth, provider, messaging };