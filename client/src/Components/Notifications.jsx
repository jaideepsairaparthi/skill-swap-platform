import React, { useEffect, useState } from 'react';
import { onMessage } from 'firebase/messaging';
import { messaging } from '../firebase';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('New notification:', payload);
      setNotifications((prev) => [
        ...prev,
        { title: payload.notification.title, body: payload.notification.body },
      ]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg p-4 rounded-lg">
      <h3 className="text-lg font-bold">Notifications</h3>
      {notifications.length === 0 && <p className="text-gray-500">No new notifications</p>}
      {notifications.map((notif, index) => (
        <div key={index} className="p-2 border-b border-gray-300">
          <p className="font-semibold">{notif.title}</p>
          <p className="text-sm text-gray-600">{notif.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
