import { getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging';
import { updateDeviceToken } from '../api';
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';

const useNotificationService = () => {
  const requestNotificationPermission = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        console.log('No current user - skipping notification setup');
        return null;
      }

      const supported = await isSupported();
      if (!supported) {
        console.warn('FCM not supported in this browser/environment');
        return null;
      }

      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.warn('Notification permission denied');
        return null;
      }

      // Get existing service worker registration
      const swRegistration = await navigator.serviceWorker.getRegistration();
      if (!swRegistration) {
        throw new Error('No service worker registration found');
      }

      const messaging = getMessaging();
      const token = await getToken(messaging, {
        vapidKey: 'BM1kELw2hgLNRVlInRoAm8yiJ6N6VAwbgquaa0Q_P0wdobJtZYwvN9r9D2zBFIU0876WxohtEhGTYb2exSGKdsE',
        serviceWorkerRegistration: swRegistration
      });

      if (!token) {
        throw new Error('Failed to generate FCM token');
      }

      await updateDeviceToken(token);
      console.log('FCM token updated successfully', token);

      // Fixed toast position reference
      onMessage(messaging, (payload) => {
        toast.info(payload.notification?.body || 'New notification', {
          position: toast.POSITION.TOP_RIGHT // Fixed reference
        });
      });

      return token;

    } catch (error) {
      console.warn('Notification service error:', error.message);
      return null;
    }
  };

  return { requestNotificationPermission };
};

export default useNotificationService;