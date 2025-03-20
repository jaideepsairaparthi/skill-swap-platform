import { messaging } from '../firebase';
import { getToken } from 'firebase/messaging';
import { updateDeviceToken } from './api'; // Import the updateDeviceToken function

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
    const result = await updateDeviceToken(token); // Use the updateDeviceToken function
    if (result?.error) {
      throw new Error(result.error);
    }
    console.log('Token sent to backend successfully');
  } catch (error) {
    console.error('Error sending token to backend:', error);
  }
};

export { requestNotificationPermission };