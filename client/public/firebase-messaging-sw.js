importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDAlBB_FDPlYayxYU7Zg9VMx4Le_6mVUeM",
  authDomain: "skillswap-3f118.firebaseapp.com",
  projectId: "skillswap-3f118",
  storageBucket: "skillswap-3f118.appspot.com",
  messagingSenderId: "125804310523",
  appId: "1:125804310523:web:8afb8222fe2aac1976e55e",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);
  const notificationTitle = payload.notification?.title || 'New Message';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/vite.svg'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});