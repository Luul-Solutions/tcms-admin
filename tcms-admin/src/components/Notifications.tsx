import React, { useState, useEffect } from "react";

interface Notification {
  id: number;
  message: string;
  date: string;
  type: "general" | "email";
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [newType, setNewType] = useState<"general" | "email">("general");

  const notificationIdRef = React.useRef(0);
  const [visibleGeneralCount, setVisibleGeneralCount] = useState(3);
  const [visibleEmailCount, setVisibleEmailCount] = useState(3);

  // Function to add a new notification
  const handleAddNotification = () => {
    if (newMessage.trim() === "") return;

    const newNotification: Notification = {
      id: notificationIdRef.current++,
      message: newMessage,
      date: new Date().toISOString().split("T")[0],
      type: newType,
    };

    setNotifications((prev) => [newNotification, ...prev]);
    setNewMessage("");
  };

  // Function to remove a notification
  const handleRemoveNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Simulate a live feed (automatic notifications)
  useEffect(() => {
    const messages: { type: "general" | "email"; message: string }[] = [
      { type: "general", message: "New enrollment opens next week!" },
      { type: "general", message: "Upcoming parent-teacher meetings." },
      { type: "general", message: "School holiday announcement confirmed." },
      { type: "email", message: "New email from admin@school.com" },
      {
        type: "general",
        message: "Maintenance scheduled for the server tomorrow.",
      },
      { type: "email", message: "Reminder: Parent feedback email received." },
    ];

    const interval = setInterval(() => {
      const randomNotification =
        messages[Math.floor(Math.random() * messages.length)];
      const newNotification: Notification = {
        id: notificationIdRef.current++,
        message: randomNotification.message,
        date: new Date().toISOString().split("T")[0],
        type: randomNotification.type,
      };

      setNotifications((prev) => [newNotification, ...prev]);
    }, 5000); // New notification every 5 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);

  const emailNotifications = notifications.filter(
    (notif) => notif.type === "email",
  );
  const generalNotifications = notifications.filter(
    (notif) => notif.type === "general",
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h3>

      {/* General Notifications */}
      <div>
        <h4 className="text-xl font-semibold text-gray-700 mb-2">
          General Notifications
        </h4>
        <div className="space-y-4">
          {generalNotifications.length > 0 ? (
            generalNotifications
              .slice(0, visibleGeneralCount)
              .map((notification) => (
                <div
                  key={notification.id}
                  className="bg-blue-50 p-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-800">{notification.message}</p>
                      <p className="text-gray-500 text-sm mt-1">
                        {notification.date}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveNotification(notification.id)}
                      className="text-red-500 font-bold"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-gray-500">No general notifications available.</p>
          )}
        </div>
        {visibleGeneralCount < generalNotifications.length && (
          <button
            onClick={() => setVisibleGeneralCount((prev) => prev + 3)}
            className="mt-4 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
          >
            Load More
          </button>
        )}
      </div>

      {/* Email Notifications */}
      <div className="mt-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-2">
          Email Notifications
        </h4>
        <div className="space-y-4">
          {emailNotifications.length > 0 ? (
            emailNotifications
              .slice(0, visibleEmailCount)
              .map((notification) => (
                <div
                  key={notification.id}
                  className="bg-yellow-50 p-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-800">{notification.message}</p>
                      <p className="text-gray-500 text-sm mt-1">
                        {notification.date}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveNotification(notification.id)}
                      className="text-red-500 font-bold"
                    >
                      ❌
                    </button>
                  </div>
                  <a
                    href="mailto:admin@school.com"
                    className="text-blue-600 mt-2 inline-block hover:underline"
                  >
                    View Email
                  </a>
                </div>
              ))
          ) : (
            <p className="text-gray-500">No email notifications available.</p>
          )}
        </div>
        {visibleEmailCount < emailNotifications.length && (
          <button
            onClick={() => setVisibleEmailCount((prev) => prev + 3)}
            className="mt-4 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
          >
            Load More
          </button>
        )}
      </div>

      {/* Add New Notification */}
      <div className="mt-6">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Enter new notification"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value as "general" | "email")}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="general">General</option>
            <option value="email">Email</option>
          </select>
        </div>
        <button
          onClick={handleAddNotification}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
        >
          ➕ Add Notification
        </button>
      </div>
    </div>
  );
};

export default Notifications;
