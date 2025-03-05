// src/components/NotificationService.js
import { messaging } from '../firebase';
import { getToken } from 'firebase/messaging';

const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, { vapidKey: 'BM1kELw2hgLNRVlInRoAm8yiJ6N6VAwbgquaa0Q_P0wdobJtZYwvN9r9D2zBFIU0876WxohtEhGTYb2exSGKdsE' });
      console.log('FCM Token:', token);
      // Send the token to your backend
      await sendTokenToBackend(token);
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
  }
};

const sendTokenToBackend = async (token) => {
  try {
    const response = await fetch('/api/user/update-device-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({ token }),
    });
    if (!response.ok) {
      throw new Error('Failed to send token to backend');
    }
    console.log('Token sent to backend successfully');
  } catch (error) {
    console.error('Error sending token to backend:', error);
  }
};

export { requestNotificationPermission };