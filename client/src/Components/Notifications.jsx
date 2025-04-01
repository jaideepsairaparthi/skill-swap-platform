import React, { useState, useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "../firebase";
import { toast } from "react-toastify";
import { fetchNotifications, markNotificationAsRead } from "../api";
import "react-toastify/dist/ReactToastify.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const loadNotifications = async () => {
      const data = await fetchNotifications();
      if (data) setNotifications(data);
      setLoading(false);
    };

    loadNotifications();

    const unsubscribe = onMessage(messaging, async (payload) => {
      console.log("📩 New Notification:", payload);

      // Use the full messageId format
      const messageId = payload.messageId
        ? `projects/skillswap-3f118/messages/${payload.messageId}`
        : `projects/skillswap-3f118/messages/${new Date().getTime().toString()}`;

      const newNotification = {
        messageId, // Use the full messageId format
        title: payload.notification?.title || "New Notification",
        body: payload.notification?.body || "",
        read: false,
      };

      toast.info(`${newNotification.title}: ${newNotification.body}`);

      setNotifications((prev) => [newNotification, ...prev]);
    });

    return () => unsubscribe();
  }, []);

  const handleMarkAsRead = async (messageId) => {
    if (!messageId) {
      console.error("❌ Error: messageId is missing");
      return;
    }
  
    console.log("📩 Marking notification as read. messageId:", messageId);
  
    // Ensure messageId is properly formatted (remove unnecessary encoding issues)
    const cleanedMessageId = encodeURIComponent(messageId);
  
    try {
      const response = await markNotificationAsRead(cleanedMessageId);
      if (response?.error) {
        throw new Error(response.error);
      }
  
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.messageId === messageId ? { ...notif, read: true } : notif
        )
      );
  
      console.log("✅ Notification marked as read:", messageId);
    } catch (error) {
      console.error("❌ Error marking notification as read:", error);
    }
  };
  

  return (
    <div className="relative">
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded-md relative flex items-center"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        🔔
        {notifications.length > 0 && (
          <span className="bg-red-500 text-white text-xs rounded-full px-2 absolute -top-2 -right-2">
            {notifications.length}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <button
              onClick={() => setShowDropdown(false)}
              className="text-gray-500 hover:text-black"
            >
              ✖
            </button>
          </div>

          {loading ? (
            <p className="text-center py-4">Loading...</p>
          ) : notifications.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No new notifications</p>
          ) : (
            <ul className="max-h-60 overflow-y-auto">
              {notifications.map((notif) => (
                <li
                  key={notif.messageId} // Use messageId as the unique key
                  className={`p-3 border-b ${notif.read ? "text-gray-500" : "font-bold"}`}
                >
                  <strong>{notif.title}</strong>
                  <p>{notif.body}</p>
                  {!notif.read && (
                    <button
                      className="text-blue-500 text-sm mt-1"
                      onClick={() => handleMarkAsRead(notif.messageId)}
                    >
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