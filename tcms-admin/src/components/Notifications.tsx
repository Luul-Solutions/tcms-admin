import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import notificationsData from "../notifications.json";

interface NotificationDetails {
  id: string;
  title: string;
  message: string;
  status: string;
  date: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] =
    useState<NotificationDetails[]>(notificationsData);
  const navigate = useNavigate();

  // // Corrected the useQuery hook to have only 2 arguments
  // const { data: serverNotifications, error: fetchError } = useQuery<
  //   NotificationDetails[]
  // // >(
  //   ["notifications"],
  //   async () => {
  //     const { data } = await axios.get("/api/notifications");
  //     return data;
  //   },
  //   {
  //     enabled: false, // Disabling automatic fetching until needed
  //   },
  // );

  const handleNotificationClick = (id: string) => {
    alert(`Clicked Notification ID: ${id}`);
    navigate("/dashboard");
  };

  const handleRefreshNotifications = () => {
    console.log("Refreshing Notifications from the server.");
    // Uncomment when backend integration is ready
    /*
    if (serverNotifications) {
      setNotifications(serverNotifications);
    }
    */
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-gray-900 font-bold text-2xl mb-4">Notifications</h2>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => handleNotificationClick(notif.id)}
            className="p-4 bg-white rounded-lg shadow cursor-pointer mb-2 hover:bg-gray-200 transition"
          >
            <p className="font-medium text-gray-900">{notif.title}</p>
            <p className="text-gray-700 mt-1">{notif.message}</p>
            <p className="text-gray-500 mt-1 text-sm">{notif.date}</p>
          </div>
        ))
      ) : (
        <p>No notifications available at the moment.</p>
      )}

      {/* Refresh Notifications Button */}
      <button
        onClick={handleRefreshNotifications}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Refresh Notifications
      </button>

      {/* Placeholder for future backend integration */}
      {/*
      useEffect(() => {
        const fetchNotifications = async () => {
          try {
            const { data } = await axios.get('/api/notifications');
            setNotifications(data);
          } catch (err) {
            console.error("Failed to fetch notifications", err);
          }
        };

        fetchNotifications();
      }, []);
      */}
    </div>
  );
};

export default Notifications;
