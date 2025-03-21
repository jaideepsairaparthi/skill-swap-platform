// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDAlBB_FDPlYayxYU7Zg9VMx4Le_6mVUeM",
  authDomain: "skillswap-3f118.firebaseapp.com",
  projectId: "skillswap-3f118",
  storageBucket: "skillswap-3f118.firebasestorage.app",
  messagingSenderId: "125804310523",
  appId: "1:125804310523:web:8afb8222fe2aac1976e55e",
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/vite.svg', // Replace with your app's icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});