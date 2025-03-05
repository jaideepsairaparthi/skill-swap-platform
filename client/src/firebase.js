// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDAlBB_FDPlYayxYU7Zg9VMx4Le_6mVUeM",
  authDomain: "skillswap-3f118.firebaseapp.com",
  projectId: "skillswap-3f118",
  storageBucket: "skillswap-3f118.firebasestorage.app",
  messagingSenderId: "125804310523",
  appId: "1:125804310523:web:8afb8222fe2aac1976e55e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const messaging = getMessaging(app);

// Register the Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js', { scope: '/' })
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}


onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'public\vite.svg', // Replace with your app's icon
  };

  new Notification(notificationTitle, notificationOptions);
});

export { app, auth, provider, messaging };