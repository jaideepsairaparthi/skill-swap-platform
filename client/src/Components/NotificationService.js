// src/components/NotificationService.js
import { messaging } from '../firebase';
import { getToken } from 'firebase/messaging';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'BM1kELw2hgLNRVlInRoAm8yiJ6N6VAwbgquaa0Q_P0wdobJtZYwvN9r9D2zBFIU0876WxohtEhGTYb2exSGKdsE', // Replace with your actual VAPID key
      });
      console.log('FCM Token:', token);
      await sendTokenToBackend(token);
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
  }
};

const sendTokenToBackend = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/update-device-token`, {
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
