import React, { useState, useEffect } from 'react';
import { onMessage } from 'firebase/messaging';
import { messaging } from '../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for incoming notifications
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('New Notification:', payload);

      const newNotification = {
        title: payload.notification?.title || 'New Notification',
        body: payload.notification?.body || '',
      };

      // Show toast notification
      toast.info(`${newNotification.title}: ${newNotification.body}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Store notification in state
      setNotifications((prev) => [newNotification, ...prev]);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <div className="fixed top-16 right-4 w-80 bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">Recent Notifications</h3>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No new notifications</p>
      ) : (
        <ul className="max-h-60 overflow-y-auto">
          {notifications.map((notif, index) => (
            <li key={index} className="p-2 border-b">
              <strong>{notif.title}</strong>
              <p>{notif.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
