import React, { useState, useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "../firebase";
import { toast } from "react-toastify";
import { fetchNotifications, markNotificationAsRead } from "../api";
import { useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const auth = getAuth();

  const generateRandomString = (length = 6) => {
    return Math.random().toString(36).slice(2, 2 + length);
  };

  const normalizeNotification = (payload) => {
    const isFirebaseFormat = payload.messageId && payload.messageId.startsWith('projects/');
    
    return {
      messageId: isFirebaseFormat 
        ? payload.messageId 
        : `postman-${Date.now()}-${generateRandomString()}`,
      title: payload.notification?.title || payload.data?.title || payload.title || "New Notification",
      body: payload.notification?.body || payload.data?.body || payload.body || "",
      read: false,
      timestamp: Date.now(),
      isExternal: !isFirebaseFormat
    };
  };

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log("User not authenticated");
          setNotifications([]);
          setLoading(false);
          return;
        }

        console.log(`Fetching notifications for user ${user.uid}`);
        const data = await fetchNotifications();
        
        if (data && Array.isArray(data)) {
          const normalizedData = data.map(notif => ({
            ...notif,
            messageId: notif.messageId || notif._id,
            timestamp: notif.timestamp || (notif.createdAt ? new Date(notif.createdAt).getTime() : Date.now()),
            isExternal: false
          }));
          
          setNotifications(normalizedData);
        }
      } catch (error) {
        console.error("Error loading notifications:", error);
        toast.error("Failed to load notifications");
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();

    const unsubscribe = onMessage(messaging, (payload) => {
      const newNotification = normalizeNotification(payload);
      setNotifications(prev => [newNotification, ...prev]);
      toast.info(`${newNotification.title}: ${newNotification.body}`);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [auth]);

  if (location.pathname === "/") return null;

  const handleMarkAsRead = async (messageId, isExternal = false) => {
    if (!messageId) {
      console.error("[Notifications] No messageId provided to mark as read");
      toast.error("Invalid notification ID");
      return;
    }

    try {
      if (!isExternal) {
        console.log(`[Notifications] Marking messageId ${messageId} as read via API...`);
        const response = await markNotificationAsRead(messageId);
        if (response?.error) throw new Error(response.error);
      }

      setNotifications(prev =>
        prev.map(notif =>
          notif.messageId === messageId ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error("[Notifications] Error marking notification as read:", error);
      toast.error("Failed to mark notification as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read);

      console.log(`[Notifications] Marking ${unreadNotifications.length} notifications as read...`);

      await Promise.all(
        unreadNotifications
          .filter(notif => !notif.isExternal)
          .map(notif => markNotificationAsRead(notif.messageId))
      );

      setNotifications(prev =>
        prev.map(notif => ({ ...notif, read: true }))
      );
    } catch (error) {
      console.error("[Notifications] Error marking all notifications as read:", error);
      toast.error("Failed to mark all notifications as read");
    }
  };

  const sortedNotifications = [...notifications].sort((a, b) => 
    (b.timestamp || 0) - (a.timestamp || 0)
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed top-[80px] right-6 z-50">
      <button
        className="relative bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white p-3 rounded-full shadow-2xl hover:scale-105 transform transition-all focus:outline-none"
        onClick={() => setShowDropdown(!showDropdown)}
        aria-label="Notifications"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white/90 backdrop-blur-lg shadow-xl rounded-lg overflow-hidden z-50 border border-gray-200">
          <div className="flex justify-between items-center bg-gray-800 text-white p-3">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
                >
                  Mark all as read
                </button>
              )}
              <button
                onClick={() => setShowDropdown(false)}
                className="text-gray-300 hover:text-white p-1"
                aria-label="Close notifications"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="p-4 text-center text-gray-500">
              <svg className="animate-spin h-5 w-5 mx-auto text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : sortedNotifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No notifications yet</div>
          ) : (
            <ul className="max-h-60 overflow-y-auto divide-y divide-gray-200">
              {sortedNotifications.map((notif) => (
                <li
                  key={notif.messageId}
                  className={`p-3 ${notif.read ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <strong className={`block truncate ${notif.read ? "text-gray-600 font-medium" : "text-gray-900 font-bold"}`}>
                        {notif.title}
                        {notif.isExternal && (
                          <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">
                            External
                          </span>
                        )}
                      </strong>
                      <p className={`text-sm mt-1 ${notif.read ? "text-gray-500" : "text-gray-700"}`}>
                        {notif.body}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notif.timestamp ? new Date(notif.timestamp).toLocaleString() : ''}
                      </p>
                    </div>
                    {!notif.read && (
                      <button
                        className="ml-2 text-cyan-600 hover:text-cyan-800 text-xs font-medium"
                        onClick={() => handleMarkAsRead(notif.messageId, notif.isExternal)}
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
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
