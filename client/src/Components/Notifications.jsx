import React, { useState, useEffect } from 'react';
import { onMessage } from 'firebase/messaging';
import { messaging } from '../firebase';
import { toast } from 'react-toastify';
import { fetchNotifications, markNotificationAsRead } from '../api'; // API functions
import 'react-toastify/dist/ReactToastify.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Fetch stored notifications from MongoDB
    const loadNotifications = async () => {
      const data = await fetchNotifications();
      if (data) setNotifications(data);
    };
    
    loadNotifications();

    // Listen for new notifications from Firebase
    const unsubscribe = onMessage(messaging, async (payload) => {
      console.log('New Notification:', payload);

      const newNotification = {
        id: payload.messageId, // Firebase message ID
        title: payload.notification?.title || 'New Notification',
        body: payload.notification?.body || '',
        read: false
      };

      toast.info(`${newNotification.title}: ${newNotification.body}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Update UI immediately
      setNotifications((prev) => [newNotification, ...prev]);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleMarkAsRead = async (id) => {
    await markNotificationAsRead(id);
    setNotifications(notifications.map(n => (n._id === id ? { ...n, read: true } : n)));
  };

  return (
    <div className="relative">
    <button
      className="bg-gray-800 text-white px-3 py-1 rounded-md"
      onClick={() => setShowDropdown(!showDropdown)}
    >
      🔔 {notifications.length}
    </button>

    {showDropdown && (
      <div className="absolute right-0 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <button onClick={() => setShowDropdown(false)}>❌</button>
        </div>
        {notifications.length === 0 ? (
          <p className="text-gray-500">No new notifications</p>
        ) : (
          <ul className="max-h-60 overflow-y-auto">
            {notifications.map((notif, index) => (
              <li key={index} className={`p-2 border-b ${notif.read ? 'text-gray-500' : 'font-bold'}`}>
                <strong>{notif.title}</strong>
                <p>{notif.body}</p>
                {!notif.read && (
                  <button className="text-blue-500 text-sm" onClick={() => handleMarkAsRead(notif._id)}>
                    Mark as Read
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    )}
  </div>
);
};

export default Notifications;
